import {
  Button,
  Card,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { useRef } from 'react';
import vendorList from '../data/vendorlist.json';
import { Vendor } from '../types';
import classes from './DropzoneButton.module.css';

interface DropzoneButtonProps {
  onFileDrop: (newVendorList: Vendor[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export default function DropzoneButton({
  onFileDrop,
  setLoading,
}: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const handleDrop = (files: File[]) => {
    setLoading(true);
    console.log({ files });

    setTimeout(() => {
      setLoading(false);
    }, 4000);

    console.log({ files });
    // Simulate reading and parsing the file to get new vendor list data
    const newVendorList: Vendor[] = vendorList;
    onFileDrop(newVendorList);
  };

  return (
    <div className={classes.wrapper}>
      <Text
        size='xl'
        fw={700}
        variant='gradient'
        ta={'center'}
        my='xs'
        tt='uppercase'
        lts='1px'
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Supplier Screening Tool
      </Text>
      <Card shadow='sm' p='md' radius='md' maw={'50em'} m='auto' withBorder>
        <Card.Section>
          <Dropzone
            openRef={openRef}
            onDrop={handleDrop}
            className={classes.dropzone}
            radius='md'
            accept={[MIME_TYPES.xlsx]}
            maxSize={30 * 1024 ** 2}
            multiple={false}
            mt={'xs'}
            m={'xs'}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Group justify='center'>
                <Dropzone.Accept>
                  <IconDownload
                    size={50}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload size={50} stroke={1.5} />
                </Dropzone.Idle>
              </Group>

              <Text ta='center' fw={700} fz='lg' mt='xs'>
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>
                  Upload Single Excel file less than 30mb
                </Dropzone.Reject>
                <Dropzone.Idle>Upload Vendor List</Dropzone.Idle>
              </Text>
              <Text ta='center' fz='sm' mt='xs' c='dimmed'>
                Drag&apos;n&apos;drop file here to upload. We can accept only
                excel
                <Text component='i'>(.xlsx)</Text> files that are less than 30mb
                in size.
              </Text>
            </div>
          </Dropzone>
        </Card.Section>

        <Card.Section>
          <Flex justify={'center'}>
            <Button
              className={classes.control}
              size='md'
              mt='xs'
              radius='xl'
              onClick={() => openRef.current?.()}
            >
              Select File
            </Button>
          </Flex>
        </Card.Section>
      </Card>
    </div>
  );
}
