import React from 'react';
import { useSelector } from 'react-redux';
import { appSelectors } from 'store/app/appSlice';

import * as Styled from './ThemeDisplay.styled';

const ColorTile = ({ color, variant }: { color: string; variant: string }): JSX.Element => {
  const theme = useSelector(appSelectors.theme);
  return (

    <Styled.Tile color={color} variant={variant}>
      <Styled.Name>{`${variant}`}</Styled.Name>
      <Styled.HexCode>{theme.palette[color][variant]}</Styled.HexCode>
    </Styled.Tile>
  );
};

const FontTile = ({
  font,
  weight,
  label,
  italic = false,
}: { font: string; weight: number; label: string; italic?: boolean }): JSX.Element => (

  <Styled.FTile font={font} weight={weight}>
    <Styled.FTileLabel italic={italic}>{label}</Styled.FTileLabel>
    <Styled.FTileWeight>{weight}</Styled.FTileWeight>
  </Styled.FTile>
);

const ThemeDisplay = (): JSX.Element => (
  <Styled.ThemeDisplay>
    <Styled.Container>
      <Styled.Header>
        Palette
      </Styled.Header>
      <Styled.Description>
        Left side of the table is also a name of the palette color and description
        in each of tile are variants. You need to prefix them with &rsquo;palette&rsquo;
        <br />
        For example, to access light variant of primary palette you need to
        type, eg.
        {' '}
        <br />
        <b>theme.palette.primary.light</b>
        <br />
        <b>theme.palette.secondary.main</b>
        <br />
        <b>theme.palette.error.dark</b>
      </Styled.Description>
      <Styled.Section>
        <Styled.Label>
          Primary
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="primary" variant="light" />
          <ColorTile color="primary" variant="main" />
          <ColorTile color="primary" variant="dark" />
          <ColorTile color="primary" variant="contrastText" />
        </Styled.Grid>

      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Secondary
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="secondary" variant="light" />
          <ColorTile color="secondary" variant="main" />
          <ColorTile color="secondary" variant="dark" />
          <ColorTile color="primary" variant="contrastText" />
        </Styled.Grid>
      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Backgrounds
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="backgrounds" variant="primary" />
          <ColorTile color="backgrounds" variant="secondary" />
        </Styled.Grid>
      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Colors
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="colors" variant="primary" />
          <ColorTile color="colors" variant="secondary" />
        </Styled.Grid>
      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Error
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="error" variant="light" />
          <ColorTile color="error" variant="main" />
          <ColorTile color="error" variant="dark" />
          <ColorTile color="primary" variant="contrastText" />
        </Styled.Grid>
      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Warning
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="warning" variant="light" />
          <ColorTile color="warning" variant="main" />
          <ColorTile color="warning" variant="dark" />
          <ColorTile color="primary" variant="contrastText" />
        </Styled.Grid>
      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Info
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="info" variant="light" />
          <ColorTile color="info" variant="main" />
          <ColorTile color="info" variant="dark" />
          <ColorTile color="primary" variant="contrastText" />
        </Styled.Grid>
      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Success
        </Styled.Label>
        <Styled.Grid>
          <ColorTile color="success" variant="light" />
          <ColorTile color="success" variant="main" />
          <ColorTile color="success" variant="dark" />
          <ColorTile color="primary" variant="contrastText" />
        </Styled.Grid>
      </Styled.Section>

    </Styled.Container>

    <Styled.Container>
      <Styled.Header>
        Fonts
      </Styled.Header>

      <Styled.Section>
        <Styled.Label>
          Primary
        </Styled.Label>
        <Styled.Grid>
          <FontTile font="primary" weight={300} label="Barlow" />
          <FontTile font="primary" weight={400} label="Barlow" />
          <FontTile font="primary" weight={600} label="Barlow" />
        </Styled.Grid>

      </Styled.Section>
      <Styled.Section>
        <Styled.Label>
          Primary Italic
        </Styled.Label>
        <Styled.Grid>
          <FontTile font="primary" weight={300} label="Barlow" italic />
          <FontTile font="primary" weight={400} label="Barlow" italic />
          <FontTile font="primary" weight={600} label="Barlow" italic />
        </Styled.Grid>

      </Styled.Section>

      <Styled.Section>
        <Styled.Label>
          Secondary
        </Styled.Label>
        <Styled.Grid>
          <FontTile font="secondary" weight={300} label="Roboto" />
          <FontTile font="secondary" weight={400} label="Roboto" />
          <FontTile font="secondary" weight={600} label="Roboto" />
        </Styled.Grid>

      </Styled.Section>
      <Styled.Section>
        <Styled.Label>
          Secondary Italic
        </Styled.Label>
        <Styled.Grid>
          <FontTile font="secondary" weight={300} label="Roboto" italic />
          <FontTile font="secondary" weight={400} label="Roboto" italic />
          <FontTile font="secondary" weight={600} label="Roboto" italic />
        </Styled.Grid>

      </Styled.Section>
    </Styled.Container>

  </Styled.ThemeDisplay>
);

export default ThemeDisplay;
