import {  ImgHTMLAttributes } from "react";
import {media as wixMedia} '@wix/sdk';

type WixImageProps = Omit <ImgHTMLAttributes<HTMLImageElement>,"src"|"width"|"height"|"alt">
&{
    mediaIdentifier:string|undefined;
    placeholder?:string;
    alt?:string|null|undefined;
}&({
    scaleToFill?:true;
    width: number;
    height: number;
}|{
  scaleToFill:false;
});

export default function wixImage({
mediaIdentifier,
placeholder = "/placeholder.png",
alt,
...props
}:WixImageProps){
    const imageUrl =mediaIdentifier
    ? props.scaleToFill ||props.scaleToFill === undefined
    ? wixMedia.getScaledToFillImageUrl(
        mediaIdentifier,
        props.width,
        props.height,
        {}
    )
    :wixMedia.getImageUrl(mediaIdentifier).url
    :placeholder;

    return <img src={imageUrl} alt={alt||""}{...props}/>;

}