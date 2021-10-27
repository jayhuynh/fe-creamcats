import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

interface EditorProps {
  onChange: (data: string) => void;
}

const Editor = ({ onChange }: EditorProps) => {
  return (
    <CKEditor
      editor={ ClassicEditor }
      config={
        {
          cloudServices: {
            tokenUrl: 'https://84403.cke-cs.com/token/dev/cb6117a02a6de4d368bd7567b9febf3e5cdc04aab8b83157ed8f01f83e75',
            uploadUrl: 'https://84403.cke-cs.com/easyimage/upload/',
          },
        } as EditorConfig
      }
      data="<p></p>"
      onReady={ editor => {
        // console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event, editor ) => {
        const data = editor.getData();
        onChange(data);
      } }
      onBlur={ ( event, editor ) => {
        // console.log( 'Blur.', editor );
      } }
      onFocus={ ( event, editor ) => {
        // console.log( 'Focus.', editor );
      } }
    />
  );
};

export default Editor;
