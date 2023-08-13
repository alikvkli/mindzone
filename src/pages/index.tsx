import Dropzone, {useDropzone} from "react-dropzone";
import {ChangeEvent, Fragment, useCallback, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {addImages, deleteImage} from "../features/app";
import {base64ToBlob, BlobToObjectUrl} from "../utils";
import {Listbox, Popover, Switch, Transition} from '@headlessui/react'
import {BiCheck, BiChevronUp, BiTrash} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import classNames from "classnames";

const sizes = [...Array(20)].map((_, key) => ({
    size: `${(key + 1) * 2 + 10}px`
}))

interface IText {
    content: string;
    color?: string;
    fontSize?: string;
    background?: string;
}

export default function HomePage() {
    const {images} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [text, setText] = useState<IText>({content: ""});

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const base64FileString = reader.result as string
                dispatch(addImages(base64FileString));
            }
            console.log("test")
            reader.readAsDataURL(file)
        })

    }, [])

    const drawImageToCanvas = (image: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;


        const img = new Image();
        img.onload = () => {
            const container = ctx.canvas.parentElement;
            if (!container) return;

            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            canvas.width = containerWidth;
            canvas.height = containerHeight;

            const aspectRatio = img.width / img.height;
            const targetWidth = containerWidth;
            const targetHeight = targetWidth / aspectRatio;

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }

        const blob = base64ToBlob(image)
        img.src = URL.createObjectURL(blob)

    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        onDrop
    })

    const [enabled, setEnabled] = useState(true)

    const handleDeleteImage = (id: string) => {
        dispatch(deleteImage(id));
    }

    const [clickPosition, setClickPosition] = useState<{ x: number, y: number }>({x: 0, y: 0})

    const handleAddNote = () => {
        if (!clickPosition.x || !clickPosition.y || !text.content) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        if (!text.fontSize) return;

        ctx.font = `${text.fontSize || "16px"} comic-sans`;

        // Arka plan
        ctx.fillStyle = `${text.background || "black"}`;
        const textMetrics = ctx.measureText(text.content);
        const textWidth = textMetrics.width;
        const textHeight = parseInt(text.fontSize.substring(0, 2), 10);

        const paddingLeft = 5;
        const paddingRight = 5;
        const paddingTop = 5;
        const paddingBottom = 5;

        ctx.fillRect(
            clickPosition.x - paddingLeft,
            clickPosition.y - textHeight - (paddingTop - paddingBottom),
            textWidth + paddingLeft + paddingRight,
            textHeight + paddingTop + paddingBottom
        );

        // Yazı rengi
        ctx.fillStyle = text.color || "white";
        ctx.fillText(text.content, clickPosition.x, clickPosition.y);

        setText((prevState) => ({...prevState, content: ""}));
        setClickPosition({x: 0, y: 0});
    };


    useEffect(() => {
        const handleCanvasClick = (e: MouseEvent) => {
            if (enabled) return;
            const rect = canvasRef?.current?.getBoundingClientRect();
            if (!rect) return;
            setClickPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
        };

        canvasRef?.current?.addEventListener("click", handleCanvasClick);

        return () => {
            canvasRef?.current?.removeEventListener("click", handleCanvasClick);
        };
    }, [enabled])


    return (
        <section className="flex p-2.5">
            <aside className="w-[350px] flex flex-col h-screen  shrink-0 border-r-[1px] pr-2  border-r-white/50">
                <div className="flex flex-col gap-2 justify-center">
                    <div className="flex justify-between items-center border-b-[1px] border-white pb-2">
                        <p>Yükleme Modu</p>
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${enabled ? 'bg-indigo-400' : 'bg-gray-300'}
          relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span
                                aria-hidden="true"
                                className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>
                    <div className="flex justify-between items-center border-b-[1px] border-white pb-2">
                        <p>Yazı Boyutu</p>
                        <Listbox value={text.fontSize || sizes[0].size}
                                 onChange={(e) => setText((prevState) => ({...prevState, fontSize: e}))}>
                            <div className="relative w-24 mt-1">
                                <Listbox.Button
                                    className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block text-black truncate">{text.fontSize || sizes[0].size}</span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BiChevronUp
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <Listbox.Options
                                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {sizes.map((item, key) => (
                                            <Listbox.Option
                                                key={key}
                                                className={({active}) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={item.size}
                                            >
                                                {({selected}) => (
                                                    <>
                      <span className={classNames("block truncate", {
                          "font-medium": selected,
                          "font-normal": !selected
                      })}>
                        {item.size}
                      </span>
                                                        {selected ? (
                                                            <span
                                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <BiCheck className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="flex justify-between items-center border-b-[1px] border-white pb-2">
                        <p>Yazı Rengi</p>
                        <input
                            value={text.color}
                            onChange={e => setText(prevState => ({...prevState, color: e.target.value}))}
                            type="color"/>
                    </div>
                    <div className="flex justify-between items-center border-b-[1px] border-white pb-2">
                        <p>Arka Plan Rengi</p>
                        <input
                            value={text.background}
                            onChange={e => setText(prevState => ({...prevState, background: e.target.value}))}
                            type="color"/>
                    </div>
                    <div>
                        {enabled && (
                            <div  {...getRootProps({className: 'flex h-24 border-[1px] cursor-copy border-dotted border-white justify-center items-center pb-2 dropzone'})}>
                                <input  {...getInputProps()} />
                                <span className="text-white">Dosya yüklemek için tıklayın veya sürükleyin</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-auto gap-1 max-h-64 overflow-y-auto">
                    {images?.map((item, key) => (
                        <button
                            onClick={() => drawImageToCanvas(item.file)}
                            className="h-full relative group"
                            key={key}>
                            <img
                                className="w-full h-[96px] rounded-md object-cover"
                                alt="test"
                                src={BlobToObjectUrl(base64ToBlob(item.file))}/>
                            <button onClick={() => handleDeleteImage(item.id)}
                                    className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <BiTrash className="bg-red-700 h-6 w-6 rounded-md"/>
                            </button>
                            <div
                                className="hidden absolute bottom-0 left-0 h-1/4 backdrop-contrast-125 bg-black/50 group-hover:flex justify-center items-center  flex-none w-full">
                                <p className="text-white text-xs ">{item.date}</p>
                            </div>
                        </button>
                    ))}
                </div>

            </aside>

            <aside className="flex-1 h-screen relative">
                <div className="flex flex-col relative h-full">
                    {clickPosition.x !== 0 && clickPosition.y !== 0 && (
                        <Popover className="relative">
                            {({open}) => (
                                <>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            style={{top: clickPosition.y, left: clickPosition.x}}
                                            className="absolute z-10 mt-3 w-screen max-w-sm  px-4 sm:px-0 lg:max-w-3xl">
                                            <div
                                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">

                                                </div>
                                                <div className="bg-gray-50 p-4">
                                                    <a
                                                        href="##"
                                                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                                                        <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    )}
                    <canvas className="flex-1" ref={canvasRef}/>
                </div>
            </aside>
        </section>
    )
}