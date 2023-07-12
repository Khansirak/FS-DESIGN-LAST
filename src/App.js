
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Menu from './components/menu';
import Phase from './components/phase';
import Equipement from './components/equipement';
import Interlock from './components/interlock';
import Description from './components/description';
import Parameter from './components/parameter';
import Signals from './components/signals';
import Alarmprompt from './components/alarmprompt';
import Logic from './components/logic';
import Library from './components/library';
import Graph from './components/graph';
import  SaveRestore from './components/flow';
import  PDFPreview from './components/pdf';
const App = () => (
  <>

    <Nav />
    <Routes>
      <Route exact path="/" element={<Menu />} />
      <Route exact path="/phase" element={<Phase />} />
      <Route exact path="/equipemen-module" element={<Equipement />} />
      <Route exact path="/interlock-module" element={<Interlock />} />
      <Route exact path="/description" element={<Description />} />
      <Route exact path="/parameter" element={<Parameter />} />
      <Route exact path="/signals" element={<Signals />} />
      <Route exact path="/alarmprompt" element={<Alarmprompt />} />
      <Route exact path="/logic" element={<Logic />} />
      <Route exact path="/library" element={<Library />} />
      <Route exact path="/graph" element={<Graph />} />
      <Route exact path="/user" element={<PDFPreview />} />
      <Route exact path="/try" element={<SaveRestore />} />
    </Routes>

    
  </>
);

export default App;
