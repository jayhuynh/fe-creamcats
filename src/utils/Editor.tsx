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
            tokenUrl: 'https://83680.cke-cs.com/token/dev/8b1e6018794322c1896172e6dd4536953ab7ad8e0463c98de8ef8a0b23a6',
            uploadUrl: 'https://83680.cke-cs.com/easyimage/upload/',
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
