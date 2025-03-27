 
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
    TextInput,
    Select,
    Button,
    Group,
    Box,
    Grid,
    Radio,
    Divider,
    Title
} from "@mantine/core";

import { IconDeviceFloppy } from "@tabler/icons-react";

const TitleMetadataSection = ({ data, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({ ...data, [field]: value });
    };

    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">Title Metadata</Title>
            <Divider my="sm" />
            <Grid gutter="md">
                <Grid.Col span={6}>
                    <TextInput
                        label="Original Title"
                        value={data.title || ""}
                        onChange={(e) => handleChange("title", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Unique ID"
                        value={data.identifier || ""}
                        onChange={(e) => handleChange("identifier", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Partner (alias)"
                        data={["Sony (sphe)", "Warner", "Universal"]}
                        value={data.partner_alias || ""}
                        onChange={(val) => handleChange("partner_alias", val)}
                        searchable
                        clearable
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Distributor"
                        value={data.distributor || ""}
                        onChange={(e) => handleChange("distributor", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Original Spoken Locale"
                        data={["English US (en-US)", "French (fr-FR)", "Portuguese BR (pt-BR)"]}
                        value={data.original_spoken_locale || ""}
                        onChange={(val) => handleChange("original_spoken_locale", val)}
                        searchable
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Country of Origin"
                        data={["United States (US)", "France (FR)", "Brazil (BR)"]}
                        value={data.country_of_origin || ""}
                        onChange={(val) => handleChange("country_of_origin", val)}
                        searchable
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Release Date"
                        placeholder="YYYY-MM-DD"
                        value={data.release_date || ""}
                        onChange={(e) => handleChange("release_date", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Radio.Group
                        label="Scheme"
                        value={data.scheme || ""}
                        onChange={(val) => handleChange("scheme", val)}
                    >
                        <Group mt="xs">
                            <Radio value="eidr-x" label="eidr-x" />
                            <Radio value="org" label="org" />
                        </Group>
                    </Radio.Group>
                </Grid.Col>
            </Grid>
            <Group mt="md" justify="flex-end">
                <Button leftSection={<IconDeviceFloppy size={16} />} variant="filled" color="blue">Save</Button>
            </Group>
        </Box>
    );
};

export default TitleMetadataSection;