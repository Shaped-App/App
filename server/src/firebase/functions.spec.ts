import {
    getDocuments,
    getDocumentData,
} from './functions';

describe('Firebase functions tests', () => {
  describe('Testing getDocuments', () => {
    it('Should find doc_id1, doc_id2', async () => {
      expect(await getDocuments('test')).toMatchObject(['doc_id1', 'doc_id2']);
    });
  });

  describe('Testing getDocumentData', () => {
    it('Should find { doc_field1: doc_value1, doc_field2: doc_value2 }', async () => {
      expect(await getDocumentData('test', 'doc_id1')).toMatchObject({ 'doc_field1': 'doc_value1', 'doc_field2': 'doc_value2' });
    });

    it('Should find { doc_field3: doc_value3 }', async () => {
      expect(await getDocumentData('test', 'doc_id2')).toMatchObject({ 'doc_field3': 'doc_value3' });
    });
  });

});
  