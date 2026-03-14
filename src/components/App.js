import { PipelineToolbar } from './toolbar/toolbar';
import { PipelineUI } from './canvas/ui';
import { SubmitButton } from './shared/submit';
import { ThemeToggle } from './shared/themeToggle';
import logo from '../vectorshift-logo.png';

function App() {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="layout-header__brand">
          <img src={logo} alt="VectorShift Logo" width="32" height="32" />
          <span>VectorShift</span>
        </div>
        <div className="layout-header__menu">
        </div>
        <div className="layout-header__spacer" style={{ flex: 1 }} />
        <ThemeToggle />
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
