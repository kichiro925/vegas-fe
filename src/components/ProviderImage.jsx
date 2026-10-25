import React, { useEffect, useState } from 'react';

const ProviderImage = ({ game, frame, galleryImgheight }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const imageUrl = game.aggregator === 'skyxspin'
        ? `https://assets.vegas-xx.org/${game.Icon.split("/").pop()}`
        : game.aggregator === 'playxspin'
            ? game.Icon
            : `https://assets.vegas-xx.org/${game.Id}.jpg`;

    // const imageUrl = game?.aggregator === 'skyxspin'
    //     ? `https://admin.skyxspin.com/${game?.Icon}`
    //     : game?.aggregator === 'playxspin'
    //         ? game?.Icon
    //         : `https://static.gmnggate.com/thumbnails/235x235/${game?.Id}.jpg`;

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setIsImageLoaded(true);
        };
    }, [imageUrl]);

    return (
        <>
            {isImageLoaded ? (
                <div
                    className="mh-main-img absolute w-full inset-0 bg-no-repeat rounded-[12px]"
                    style={{
                        height: galleryImgheight ? `${galleryImgheight}px` : '100%',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: '100% 100%'
                    }}
                >
                    {/* { game.SectionId == 'playstar' ? '' : <img src={frame} alt="frame" className="w-full h-full object-fill" /> } */}
                    <img src={frame} alt="frame" className={`w-full h-full object-fill ${game.SectionId === 'playstar' ? 'hidden' : ''}`} />
                </div>
            ) : (
                <div style={{ height: `${galleryImgheight}px` }} className="flex items-center justify-center">
                    <img src={frame} alt="frame" className={`w-full h-full object-fill ${game.SectionId === 'playstar' ? 'hidden' : ''}`} />
                </div>
            )}
        </>
    );
};

export default ProviderImage;