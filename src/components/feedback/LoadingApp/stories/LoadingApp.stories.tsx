import { BrowserRouter } from "react-router-dom";
import { LoadingApp } from "..";


const story = {
  components: [LoadingApp],
  title: "feedback/loading-app",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = () => <LoadingApp />;

export default story;

export { Default };
