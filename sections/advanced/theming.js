import md from 'components/md'

const Theming = () => md`
  ## Theming

  styled-components has full theming support by exporting a \`<ThemeProvider>\` wrapper component.
  This component provides a theme to all React components underneath itself via the context API. In the render
  tree all styled-components will have access to the provided theme, even when they are multiple levels deep.

  To illustrate this, let's create our Button component, but this time we'll pass some variables down
  as a theme.

  To start, you need to import the \`theme-provider\` wrapper component.

  \`\`\`jsx
     import styled, { ThemeProvider } from 'styled-components';
  \`\`\`

  \`\`\`react
  // Define our button, but with the use of props.theme this time
  const Button = styled.button\`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: \${props => props.theme.main};
    border: 2px solid \${props => props.theme.main};
  \`;

  // We're passing a default theme for Buttons that aren't wrapped in the ThemeProvider
  Button.defaultProps = {
    theme: {
      main: 'palevioletred'
    }
  }

  // Define what props.theme will look like
  const theme = {
    main: 'mediumseagreen'
  };

  render(
    <div>
      <Button>Normal</Button>

      <ThemeProvider theme={theme}>
        <Button>Themed</Button>
      </ThemeProvider>
    </div>
  );
  \`\`\`

  ### Function themes

  You can also pass a function for the theme prop. This function will receive the parent theme, that is from
  another \`<ThemeProvider>\` higher up the tree. This way themes themselves can be made contextual.

  This example renders our above themed Button and a second one that uses a second ThemeProvider to invert the
  background and foreground colours. The function \`invertTheme\` receives the upper theme and creates a new one.

  \`\`\`react
  import styled, { ThemeProvider } from 'styled-components';

  // Define our button, but with the use of props.theme this time
  const Button = styled.button\`
    color: \${props => props.theme.fg};
    border: 2px solid \${props => props.theme.fg};
    background: \${props => props.theme.bg};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
  \`;

  // Define our \`fg\` and \`bg\` on the theme
  const theme = {
    fg: 'palevioletred',
    bg: 'white'
  };

  // This theme swaps \`fg\` and \`bg\`
  const invertTheme = ({ fg, bg }) => ({
    fg: bg,
    bg: fg
  });

  render(
    <ThemeProvider theme={theme}>
      <div>
        <Button>Default Theme</Button>

        <ThemeProvider theme={invertTheme}>
          <Button>Inverted Theme</Button>
        </ThemeProvider>
      </div>
    </ThemeProvider>
  );
  \`\`\`

  ### Getting the theme without styled components

  If you ever need to use the current theme outside styled components (e.g. inside big components), you can use
  the \`withTheme\` higher order component.

  \`\`\`jsx
  import { withTheme } from 'styled-components'

  class MyComponent extends React.Component {
    render() {
      console.log('Current theme: ', this.props.theme);
      // ...
    }
  }

  export default withTheme(MyComponent)
  \`\`\`

  ### The \`theme\` prop

  A theme can also be passed down to a component using the \`theme\` prop.

  This is useful to circumvent a missing \`ThemeProvider\` or to override it.

  \`\`\`react
  import styled, { ThemeProvider } from 'styled-components';

  // Define our button
  const Button = styled.button\`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: \${props => props.theme.main};
    border: 2px solid \${props => props.theme.main};
  \`;

  // Define what main theme will look like
  const theme = {
    main: 'mediumseagreen'
  };

  render(
    <div>
      <Button theme={{ main: 'royalblue' }}>Ad hoc theme</Button>
      <ThemeProvider theme={theme}>
        <div>
          <Button>Themed</Button>
          <Button theme={{ main: 'darkorange' }}>Overidden</Button>
        </div>
      </ThemeProvider>      
    </div>
  );
  \`\`\`

  
`

export default Theming
