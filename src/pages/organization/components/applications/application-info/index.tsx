import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
}));


interface ApplicationInfoProps {
  applicationInformation: {
    isOpen: boolean;
    data: any;
  };
  handlerCloseApplication: () => void;
}

export const ApplicationInfo = ({ applicationInformation, handlerCloseApplication }: ApplicationInfoProps) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog maxWidth="md" fullWidth open={applicationInformation.isOpen} onClose={handlerCloseApplication} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Grid container>
            {JSON.stringify(applicationInformation.data)}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationInfo;
