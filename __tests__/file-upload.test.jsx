import React from 'react';
import { shallow } from 'enzyme';
import FileUpload from '../components/file-upload';

const mockUploadFile = function uploadFile(file) {
  return file.name;
};

test('FileUpload component renders.', () => {
  const component = shallow(<FileUpload uploadFile={mockUploadFile} />);
  expect(component).toMatchSnapshot();
});

const mockSingleFileUploadEvent = {
  target: {
    files: [
      {
        name: 'pyruvate.csv',
        type: 'text/csv'
      }
    ]
  }
};

test('FileUpload.handleUpload() can call fileUpload.', () => {
  const wrapper = shallow(<FileUpload uploadFile={mockUploadFile} />);
  const fileName = wrapper.instance().handleUpload(mockSingleFileUploadEvent);
  expect(fileName).toEqual('pyruvate.csv');
});
