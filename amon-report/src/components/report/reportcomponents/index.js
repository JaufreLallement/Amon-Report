import { ReportChart } from './ReportChart';
import { ReportFirstPage } from './ReportFirstPage';
import { ReportProgress } from './ReportProgress';
import { ReportProgressList } from './ReportProgressList';
import { ReportTable } from './ReportTable';

const componentOptions = {
  ReportFirstPage   : { component: ReportFirstPage },
  ReportTable       : { component: ReportTable, chunk: 20 },
  ReportChart       : { component: ReportChart },
  ReportProgress    : { component: ReportProgress },
  ReportProgressList: { component: ReportProgressList },
};

export * from './ReportSection';
export default componentOptions;