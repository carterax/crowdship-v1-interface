import React, { FC } from 'react';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

// Our app
export const FileUpload: FC<{
  name: string;
  className?: string;
  serverConfig?: any;
  file: any;
  setFile: any;
}> = ({ name, className, serverConfig, file, setFile }) => {
  return (
    <div className={className}>
      <FilePond
        files={file}
        onupdatefiles={setFile}
        allowMultiple={false}
        maxFiles={1}
        name={name}
        server={serverConfig}
        instantUpload={false}
        allowProcess={false}
        maxFileSize='2MB'
        acceptedFileTypes={['image/jpeg', 'image/png', 'image/gif']}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
