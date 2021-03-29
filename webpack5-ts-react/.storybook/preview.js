
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const Provider =(Story, context) => {
  return (
    <Story {...context} />
  )
}

export const decorators = [Provider]
