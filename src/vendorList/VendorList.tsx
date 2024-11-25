import {
  ActionIcon,
  Box,
  CloseButton,
  Flex,
  Input,
  LoadingOverlay,
  Menu,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import {
  IconDownload,
  IconFileExcel,
  IconFileTypePdf,
  IconSearch,
} from '@tabler/icons-react';
import { Vendor } from '../types';

interface VendorListProps {
  vendorList: Vendor[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const downloadFile = (url: string, data: object, filename: string) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch(() => alert(`Failed to download ${filename}`));
};

const VendorList = ({
  vendorList,
  isLoading,
  searchQuery,
  setSearchQuery,
}: VendorListProps) => {
  const filteredVendorList = vendorList.filter(
    (vendor) =>
      vendor.Company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.Country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const rows = filteredVendorList.map((vendor) => (
    <Table.Tr key={randomId()}>
      <Table.Td>{vendor.Country}</Table.Td>
      <Table.Td>{vendor.Company}</Table.Td>

      <Table.Td>
        <Flex justify={'center'} w='100%'>
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            position='left-start'
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant='subtle' color='gray'>
                <IconDownload size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconFileTypePdf size={16} stroke={1.5} />}
                onClick={() =>
                  downloadFile(
                    'http://localhost:3000/download/pdf',
                    {
                      Company: vendor.Company,
                      Country: vendor.Country,
                      lang_engUS: vendor.lang_engUS,
                      rawEnglish: vendor.raw_english,
                    },
                    'vendor_report.pdf',
                  )
                }
                mb='2px'
              >
                Download PDF
              </Menu.Item>
              <Menu.Item
                leftSection={<IconFileExcel size={16} stroke={1.5} />}
                onClick={() =>
                  downloadFile(
                    'http://localhost:3000/download/excel',
                    {
                      Company: vendor.Company,
                      Country: vendor.Country,
                      lang_engUS: vendor.lang_engUS,
                      rawEnglish: vendor.raw_english,
                    },
                    'vendor_report.xlsx',
                  )
                }
              >
                Download Excel
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box mt='md'>
      <Flex justify={'space-between'} align={'flex-end'} m={'md'}>
        <Flex direction={'column'}>
          <Box>
            <Title order={3} fw={500}>
              Vendor List
            </Title>
            <Text c='dimmed'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Text>
          </Box>
        </Flex>
        <Input
          type='search'
          placeholder='Search'
          w='300px'
          leftSection={<IconSearch size={16} />}
          rightSectionPointerEvents='all'
          rightSection={
            <CloseButton
              aria-label='Clear input'
              onClick={() => setSearchQuery('')}
              style={{ display: searchQuery ? undefined : 'none' }}
            />
          }
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
      </Flex>
      <ScrollArea
        h={`calc(100vh - 400px)`}
        m={'md'}
        type='hover'
        scrollbarSize={5}
        offsetScrollbars
      >
        <LoadingOverlay visible={isLoading} overlayProps={{ blur: 5 }} />
        <Table stickyHeader striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Country</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th w={80}>Download</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text ta='center'>No results found</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
};

export default VendorList;
