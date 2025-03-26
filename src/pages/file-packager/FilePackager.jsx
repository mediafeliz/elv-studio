// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
    Box,
    Container,
    Divider,
    Group
} from "@mantine/core";

import mockData from "./mockFilePackager.json";

import TitleMetadataSection from "./sections/TitleMetadataSection";
import PackageFilesSection from "./sections/PackageFilesSection";
import LocalizationsSection from "./sections/LocalizationsSection";
import RatingsSection from "./sections/RatingsSection";
import ReleaseDatesSection from "./sections/ReleaseDatesSection";
import PeopleSection from "./sections/PeopleSection";
import ContentInputSection from "./sections/ContentInputSection";

const FilePackager = () => {
    const [data, setData] = useState(mockData);

    const updateSection = (section, value) => {
        setData(prev => ({ ...prev, [section]: value }));
    };

    return (
        <Container size="xl" px="lg" py="xl">
            <ContentInputSection />

            <Divider my="lg" />

            <TitleMetadataSection
                data={data.title_metadata}
                onUpdate={val => updateSection("title_metadata", val)}
            />

            <Divider my="lg" />

            <PackageFilesSection
                data={data.files_only_data}
                onUpdate={val => updateSection("files_only_data", val)}
            />

            <Divider my="lg" />

            <LocalizationsSection
                data={data.localizations}
                onUpdate={val => updateSection("localizations", val)}
            />

            <Divider my="lg" />

            <Group align="start" grow spacing="lg" mt="lg">
                <Box>
                    <RatingsSection
                        data={data.ratings}
                        onUpdate={val => updateSection("ratings", val)}
                    />

                    <ReleaseDatesSection
                        data={data.release_dates}
                        onUpdate={val => updateSection("release_dates", val)}
                    />
                </Box>

                <Box>
                    <PeopleSection
                        data={data.people}
                        onUpdate={val => updateSection("people", val)}
                    />
                </Box>
            </Group>
        </Container>
    );
};

export default FilePackager;