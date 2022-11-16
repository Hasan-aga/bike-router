import styled from "styled-components";

export const CustomMap = styled.div`
  height: 100%;
  .mapcontainer {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .search-wrapper {
    display: flex;
  }

  @media (max-width: 40em) {
    .elevation-chart {
      .custom-tooltip {
        visibility: collapse;
      }
    }
  }

  ${(props) =>
    props.theme == "dark"
      ? `
          .leaflet-tile {
            -webkit-filter: hue-rotate(160deg) invert(80%);
          }
        `
      : ""}
`;
