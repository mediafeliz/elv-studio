// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
    Box,
    Table,
    Title,
    Button,
    Group,
    TextInput,
    Divider,
    Checkbox,
    Select
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { localeIsoNames } from "@/utils/media-packager/isoLocales";
import { fileTypes } from "@/utils/media-packager/types";

const PackageFilesSection = ({ data, onUpdate }) => {
    const [entries, setEntries] = useState(data || []);
    const [newEntry, setNewEntry] = useState({
        file_type: "",
        sub_type: "",
        file_name: "",
        is_dubbed: false,
        locale: "",
        track_of: "",
        details: ""
    });
    const [selected, setSelected] = useState([]);

    const toggleSelection = (index) => {
        setSelected((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const addNewEntry = () => {
        const updated = [...entries, newEntry];
        setEntries(updated);
        onUpdate(updated);
        setNewEntry({
            file_type: "",
            sub_type: "",
            file_name: "",
            is_dubbed: false,
            locale: "",
            track_of: "",
            details: ""
        });
    };

    const getFileTypeOptions = () => Object.keys(fileTypes);
    const getSubTypeOptions = (type) => fileTypes[type]?.subTypes || [];
    const getLocaleOptions = () =>
        Object.entries(localeIsoNames).map(([code, name]) => ({
            value: code,
            label: `${name} (${code})`
        }));

    const getTrackOfOptions = () =>
        entries.filter(f => ["source", "preview"].includes(f.file_type))
            .map(f => ({
                value: f.file_name,
                label: `[${f.file_type}] ${f.file_name}`
            }));

    const handleChange = (index, field, value) => {
        const updated = [...entries];
        updated[index][field] = value;
        setEntries(updated);
        onUpdate(updated);
    };

    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">
                Package Files
            </Title>
            <Divider my="sm" />

            <Table withTableBorder withColumnBorders striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th w="140px">File Type</Table.Th>
                        <Table.Th w="140px">Sub Type</Table.Th>
                        <Table.Th>File Name</Table.Th>
                        <Table.Th>Dubbed</Table.Th>
                        <Table.Th>Locale</Table.Th>
                        <Table.Th>Track Of</Table.Th>
                        <Table.Th>Burned Sub</Table.Th>
                        <Table.Th>Details</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {entries.map((item, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Checkbox
                                    checked={selected.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                    disabled={!["audio", "source", "preview"].includes(item.file_type)}
                                />
                            </Table.Td>
                            <Table.Td w="140px">
                                <Select
                                    data={getFileTypeOptions()}
                                    value={item.file_type}
                                    onChange={(val) => handleChange(index, "file_type", val)}
                                    searchable
                                    placeholder="Select type"
                                />
                            </Table.Td>
                            <Table.Td w="140px">
                                <Select
                                    data={getSubTypeOptions(item.file_type)}
                                    value={item.sub_type}
                                    onChange={(val) => handleChange(index, "sub_type", val)}
                                    placeholder="Select subtype"
                                    disabled={!item.file_type}
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    value={item.file_name}
                                    onChange={(e) => handleChange(index, "file_name", e.target.value)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Checkbox
                                    checked={item.is_dubbed}
                                    onChange={(e) => handleChange(index, "is_dubbed", e.currentTarget.checked)}
                                    disabled={!["audio", "source", "preview"].includes(item.file_type)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Select
                                    data={getLocaleOptions()}
                                    value={item.locale}
                                    onChange={(val) => handleChange(index, "locale", val)}
                                    searchable
                                    placeholder="Select locale"
                                    disabled={["preview", "source"].includes(item.file_type)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Select
                                    data={getTrackOfOptions()}
                                    value={item.track_of}
                                    onChange={(val) => handleChange(index, "track_of", val)}
                                    placeholder="Select track"
                                    searchable
                                    disabled={!["audio", "subtitle"].includes(item.file_type)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    value={item.burned_sub || ""}
                                    onChange={(e) => handleChange(index, "burned_sub", e.target.value)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    value={item.details || ""}
                                    onChange={(e) => handleChange(index, "details", e.target.value)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}

                    {/* Add new row */}
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td>
                            <Select
                                data={getFileTypeOptions()}
                                value={newEntry.file_type}
                                onChange={(val) => setNewEntry({ ...newEntry, file_type: val, sub_type: "" })}
                                placeholder="Select type"
                                searchable
                            />
                        </Table.Td>
                        <Table.Td>
                            <Select
                                data={getSubTypeOptions(newEntry.file_type)}
                                value={newEntry.sub_type}
                                onChange={(val) => setNewEntry({ ...newEntry, sub_type: val })}
                                placeholder="Select subtype"
                                disabled={!newEntry.file_type}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.file_name}
                                onChange={(e) => setNewEntry({ ...newEntry, file_name: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <Checkbox
                                checked={newEntry.is_dubbed}
                                onChange={(e) => setNewEntry({ ...newEntry, is_dubbed: e.currentTarget.checked })}
                                disabled={!["audio", "source", "preview"].includes(newEntry.file_type)}
                            />
                        </Table.Td>
                        <Table.Td>
                            <Select
                                data={getLocaleOptions()}
                                value={newEntry.locale}
                                onChange={(val) => setNewEntry({ ...newEntry, locale: val })}
                                searchable
                                placeholder="Select locale"
                                disabled={["preview", "source"].includes(newEntry.file_type)}
                            />
                        </Table.Td>
                        <Table.Td>
                            <Select
                                data={getTrackOfOptions()}
                                value={newEntry.track_of}
                                onChange={(val) => setNewEntry({ ...newEntry, track_of: val })}
                                placeholder="Select track"
                                searchable
                                disabled={!["audio", "subtitle"].includes(newEntry.file_type)}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.burned_sub || ""}
                                onChange={(e) => setNewEntry({ ...newEntry, burned_sub: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.details || ""}
                                onChange={(e) => setNewEntry({ ...newEntry, details: e.target.value })}
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <Group mt="sm" justify="flex-end">
                <Button variant="default" onClick={addNewEntry} leftSection={<IconPlus size={16} />}>Add Row</Button>
            </Group>
        </Box>
    );
};

export default PackageFilesSection;