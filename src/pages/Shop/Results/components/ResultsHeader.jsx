import { Widget2 as GridIcon, List as ListIcon } from '@solar-icons/react';

const ResultsHeader = ({ viewMode, onViewChange }) => (
  <button
    className="results-header__view-btn"
    onClick={() => onViewChange(viewMode === 'grid' ? 'list' : 'grid')}
    aria-label={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
  >
    {viewMode === 'grid' ? <ListIcon size={20} /> : <GridIcon size={20} />}
  </button>
);

export default ResultsHeader;
