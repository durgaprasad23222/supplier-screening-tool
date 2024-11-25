import { Container } from '@mantine/core';
import { useState } from 'react';
import DropzoneButton from './dropzone/Dropzone';
import { Vendor } from './types';
import VendorList from './vendorList/VendorList';

export default function Dashboard() {
  const [vendorList, setVendorList] = useState<Vendor[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFileDrop = (newVendorList: Vendor[]) => {
    setVendorList(newVendorList);
  };

  return (
    <Container size={'65rem'}>
      <DropzoneButton onFileDrop={handleFileDrop} setLoading={setIsLoading} />
      {vendorList && (
        <VendorList
          vendorList={vendorList}
          isLoading={isLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </Container>
  );
}
