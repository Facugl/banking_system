import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EntityActionsCellProps {
  entityLabel: string;
  onDelete: () => void;
  onEdit?: () => void;
}

/**
 * Edit + Delete icon buttons for a DataGrid actions column, shared by the
 * Roles/Modules/Operations tables (edit+delete) and Permissions table
 * (delete only, by omitting onEdit). Centralizes the aria-label/Tooltip
 * pairing so the accessible-name fix only needs to live in one place.
 */
const EntityActionsCell: React.FC<EntityActionsCellProps> = ({
  entityLabel,
  onDelete,
  onEdit,
}) => (
  <Box display='flex' gap={1}>
    {onEdit && (
      <Tooltip title={`Edit ${entityLabel}`}>
        <IconButton
          color='primary'
          aria-label={`Edit ${entityLabel}`}
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    )}

    <Tooltip title={`Delete ${entityLabel}`}>
      <IconButton
        color='error'
        aria-label={`Delete ${entityLabel}`}
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </Box>
);

export default EntityActionsCell;
