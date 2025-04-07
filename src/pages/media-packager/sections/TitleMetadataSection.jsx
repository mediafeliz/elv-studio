// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
import {
    TextInput,
    Select,
    Group,
    Box,
    Grid,
    Radio,
    Divider,
    Title
} from "@mantine/core";

import { localeIsoNames } from "@/utils/media-packager/isoLocales";
import { filmRatings } from "@/utils/media-packager/territoryRatings";

const TitleMetadataSection = ({ data, onUpdate }) => {
    const [localData, setLocalData] = useState(data);
    const dateInputRef = useRef(null);

    const handleChange = (field, value) => {
        const updated = { ...localData, [field]: value };
        setLocalData(updated);
        onUpdate(updated);
    };

    const handleDateChange = (value) => {
        handleChange("release_date", value);
    };

    const handleDateBlur = () => {
        const date = localData.release_date;
        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            alert("Invalid date format. Please use YYYY-MM-DD.");
            setTimeout(() => dateInputRef.current?.focus(), 0);
        }
    };

    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">Title Metadata</Title>
            <Divider my="sm" />
            <Grid gutter="md">
                <Grid.Col span={6}>
                    <TextInput
                        label="Original Title"
                        value={localData.title || ""}
                        onChange={(e) => handleChange("title", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Radio.Group
                        label="Scheme"
                        value={localData.scheme || ""}
                        onChange={(val) => handleChange("scheme", val)}
                    >
                        <Group mt="xs">
                            <Radio value="eidr-x" label="eidr-x" />
                            <Radio value="org" label="org" />
                        </Group>
                    </Radio.Group>
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Partner (alias)"
                        value={localData.partner_alias || ""}
                        onChange={(e) => handleChange("partner_alias", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Distributor"
                        value={localData.distributor || ""}
                        onChange={(e) => handleChange("distributor", e.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Original Spoken Locale"
                        data={Object.entries(localeIsoNames).map(([code, name]) => ({ value: code, label: `${name} (${code})` }))}
                        value={localData.original_spoken_locale || null}
                        onChange={(val) => handleChange("original_spoken_locale", val)}
                        searchable
                        clearable
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Country of Origin"
                        data={Object.entries(filmRatings).map(([code, { name }]) => ({ value: code, label: `${name} (${code})` }))}
                        value={localData.country_of_origin || null}
                        onChange={(val) => handleChange("country_of_origin", val)}
                        searchable
                        clearable
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Release Date"
                        placeholder="YYYY-MM-DD"
                        value={localData.release_date || ""}
                        onChange={(e) => handleDateChange(e.currentTarget.value)}
                        onBlur={handleDateBlur}
                        ref={dateInputRef}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Unique ID"
                        value={localData.identifier || ""}
                        onChange={(e) => handleChange("identifier", e.currentTarget.value)}
                    />
                </Grid.Col>        
            </Grid>
        </Box>
    );
};

export default TitleMetadataSection;