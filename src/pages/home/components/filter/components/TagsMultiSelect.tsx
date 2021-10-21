import { Tag } from '../../../../../models';
import { useSelector } from 'react-redux';
import { fromTags, useAppDispatch } from '../../../../../store';
import { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Checkbox, TextField } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';

interface TagsMultiSelectProps {
  selectedTags: Tag[];
  onTagsChange: (value: Tag[]) => unknown;
  limitTags: number;
}

const TagsMultiSelect = ({ onTagsChange, selectedTags, limitTags }: TagsMultiSelectProps) => {
  const tags = useSelector(fromTags.selectTags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromTags.doFetchTags());
  }, [dispatch]);

  return (
    <Autocomplete
      multiple
      limitTags={limitTags}
      options={tags}
      disableCloseOnSelect
      fullWidth
      value={selectedTags}
      onChange={(event, value) => {
        onTagsChange(value);
      }}
      getOptionLabel={option => option}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small"/>}
            checkedIcon={<CheckBox fontSize="small"/>}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" placeholder="tags"/>
      )}
    />
  );
};

export default TagsMultiSelect;
