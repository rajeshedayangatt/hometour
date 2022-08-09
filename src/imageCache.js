import * as THREE from 'three';

const loadCachedImage = ( url, onLoad, onProgress, onError ) => {
  let cached, request, arrayBufferView, blob, urlCreator, image;

  cached = THREE.Cache.get( url );

  if ( cached !== undefined ) {
    if ( onLoad ) {
      setTimeout( function () {
        if ( onProgress )
          onProgress( { loaded: 1, total: 1 } );

        onLoad( cached );
      }, 0 );
    }
    return cached;
  }

  urlCreator = window.URL || window.webkitURL;
  image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );

  THREE.Cache.add( url, image );

  const onImageLoaded = () => {
    urlCreator.revokeObjectURL( image.src );
    onLoad && onLoad( image );
  }

  if ( url.indexOf( 'data:' ) === 0 ) {
    image.addEventListener( 'load', onImageLoaded, false );
    image.src = url;
    return image;
  }

  image.crossOrigin = '';

  request = new XMLHttpRequest();
  request.open( 'GET', url, true );
  request.responseType = 'arraybuffer';
  request.onprogress = function ( event ) {
    if ( event.lengthComputable ) {
      onProgress && onProgress( { loaded: event.loaded, total: event.total } );
    }
  };

  request.onloadend = function( event ) {
    arrayBufferView = new Uint8Array( this.response );
    blob = new Blob( [ arrayBufferView ] );
    image.addEventListener( 'load', onImageLoaded, false );
    image.src = urlCreator.createObjectURL( blob );
  };
  request.send(null);
};

export default loadCachedImage;
