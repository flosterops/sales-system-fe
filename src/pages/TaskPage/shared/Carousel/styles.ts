import styled from 'styled-components';

export const CarouselWrapper = styled.div<{ numberOfItems: number }>`
  width: 100%;

  .image-gallery {
    display: unset;
    width: 100%;
  }

  .image-gallery-content {
    display: unset;
  }

  .image-gallery-index {
    top: unset;
    bottom: 0;
    background-color: black;
    border-radius: 10px 0 10px 0;
  }

  .image-gallery-thumbnails {
    width: 100%;
    height: 58.3px;

    .image-gallery-thumbnail-image {
      object-fit: cover;
    }
  }

  .image-gallery-thumbnails-wrapper {
    display: ${(props) => (props.numberOfItems > 1 ? 'block' : 'none')};
  }

  .image-gallery-thumbnails-container {
    width: 100%;

    button {
      width: 20%;
    }
  }

  .image-gallery-slides,
  .image-gallery-slide {
    border-radius: 10px;

    & > img {
      border-radius: 10px;
    }
  }

  .image-gallery-image {
    height: 292px;
    width: 100%;
    object-fit: cover;
  }

  .image-gallery-index-separator {
    margin: 0 0.25rem;
  }

  .image-gallery-thumbnail {
    opacity: 0.5;
    outline: none;
    border: none;
    margin: 0;

    & * {
      height: 58.3px;
    }

    &:hover {
      cursor: pointer;
      opacity: 1;
      border: none;
    }

    &:first-of-type {
      border-radius: 10px 0 0 10px;

      & img {
        border-radius: 10px 0 0 10px;
      }
    }

    &:last-of-type {
      border-radius: 0 10px 10px 0;

      & img {
        border-radius: 0 10px 10px 0;
      }
    }
  }

  .image-gallery-thumbnail.active {
    opacity: 1;
    border: none;
  }
`;
