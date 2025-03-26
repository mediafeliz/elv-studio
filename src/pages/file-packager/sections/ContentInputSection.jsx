// eslint-disable-next-line no-unused-vars
import React from "react";
import {
    Box,
    TextInput,
    Button,
    Title,
    Divider,
    Group,
    Badge,
    Stack
} from "@mantine/core";
import { IconFolder, IconUpload, IconTrash, IconRefresh, IconLoader } from "@tabler/icons-react";

const ContentInputSection = () => {
    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">Content Object Input / Controls</Title>
            <Divider my="sm" />

            <Stack spacing="xs">
                <Group>
                    <Badge color="gray">audio 1</Badge>
                    <Badge color="gray">preview 1</Badge>
                    <Badge color="yellow">source 1</Badge>
                    <Badge color="gray">subtitle 1</Badge>
                </Group>

                <Group spacing="xs">
                    <Button leftSection={<IconFolder size={16} />} variant="light">
                        resources
                    </Button>
                    <TextInput
                        style={{ flexGrow: 1 }}
                        defaultValue="/Users/wlmbgm/Documents/2G/AMAZON_MMC/FILM/_DEMO/assets"
                    />
                    <Button leftSection={<IconLoader size={16} />} variant="default">Load Package</Button>
                </Group>

                <Group spacing="xs">
                    <Button leftSection={<IconUpload size={16} />}>Create Package</Button>
                    <Button leftSection={<IconRefresh size={16} />} variant="default">Reload XLS metadata</Button>
                    <Button leftSection={<IconTrash size={16} />} color="red" variant="light">
                        purge package_data.json
                    </Button>
                </Group>
            </Stack>
        </Box >
    );
};

export default ContentInputSection;