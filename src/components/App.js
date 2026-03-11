import { PipelineToolbar } from './toolbar/toolbar';
import { PipelineUI } from './canvas/ui';
import { SubmitButton } from './shared/submit';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
