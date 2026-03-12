import { PipelineToolbar } from './toolbar/toolbar';
import { PipelineUI } from './canvas/ui';
import { SubmitButton } from './shared/submit';

function App() {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="layout-header__brand">VectorShift</div>
        <div className="layout-header__menu">
        </div>
        <div className="layout-header__spacer" style={{ flex: 1 }} />
        <SubmitButton />
      </header>
      <div className="layout-main">
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
