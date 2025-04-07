// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
    Box,
    Table,
    Title,
    Button,
    Group,
    Divider,
    Checkbox,
    TextInput,
    Select,
    MultiSelect
} from "@mantine/core";
import { IconPlus, IconTrash, IconLayoutColumns } from "@tabler/icons-react";
import { localeIsoNames } from "@/utils/media-packager/isoLocales";
import { genres } from "@/utils/media-packager/genres";

const LocalizationsSection = ({ data = [], onUpdate }) => {
    const [entries, setEntries] = useState(data || []);
    const [selected, setSelected] = useState([]);

    const toggleSelection = (index) => {
        setSelected((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleAll = () => {
        setSelected((prev) =>
            prev.length === entries.length ? [] : entries.map((_, i) => i)
        );
    };

    const setDefault = (index) => {
        const updated = entries.map((item, i) => ({ ...item, is_default: i === index }));
        setEntries(updated);
        onUpdate(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = [...entries];
        updated[index][field] = value;
        setEntries(updated);
        onUpdate(updated);
    };

    const addOrDuplicate = () => {
        let updated;
        if (selected.length > 0) {
            updated = [...entries, ...selected.map(i => ({ ...entries[i], locale: "", is_default: false }))];
        } else {
            updated = [...entries, { locale: "", original_title: "", genres: [], summary_190: "", copyright: "", is_default: false }];
        }
        setEntries(updated);
        setSelected([]);
        onUpdate(updated);
    };

    const deleteSelected = () => {
        const updated = entries.filter((_, i) => !selected.includes(i));
        setEntries(updated);
        setSelected([]);
        onUpdate(updated);
    };

    const getLocaleOptions = () =>
        Object.entries(localeIsoNames).map(([code]) => ({ value: code, label: `${code}` }));

    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">
                Localizations
            </Title>
            <Divider my="sm" />

            <Table withTableBorder withColumnBorders striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Checkbox
                                checked={selected.length === entries.length}
                                indeterminate={selected.length > 0 && selected.length < entries.length}
                                onChange={toggleAll}
                            />
                        </Table.Th>
                        <Table.Th>Default</Table.Th>
                        <Table.Th>Locale</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Genres</Table.Th>
                        <Table.Th>Summary 190</Table.Th>
                        <Table.Th>Copyright</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {entries.map((loc, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Checkbox
                                    checked={selected.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Checkbox
                                    checked={loc.is_default || false}
                                    onChange={() => setDefault(index)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Select
                                    data={getLocaleOptions()}
                                    value={loc.locale}
                                    onChange={(val) => handleChange(index, "locale", val)}
                                    searchable
                                    placeholder="Select locale"
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    value={loc.original_title || ""}
                                    onChange={(e) => handleChange(index, "original_title", e.target.value)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <MultiSelect
                                    data={genres}
                                    value={loc.genres || []}
                                    onChange={(val) => handleChange(index, "genres", val)}
                                    searchable
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    value={loc.summary_190 || ""}
                                    onChange={(e) => handleChange(index, "summary_190", e.target.value)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <TextInput
                                    value={loc.copyright || ""}
                                    onChange={(e) => handleChange(index, "copyright", e.target.value)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="end" mt="md">
                <Button variant="light" color="gray" leftSection={<IconLayoutColumns size={16} />}>Columns</Button>
                <Button variant="light" color="blue" leftSection={<IconPlus size={16} />} onClick={addOrDuplicate}>Add or Duplicate</Button>
                <Button variant="light" color="red" leftSection={<IconTrash size={16} />} onClick={deleteSelected}>Delete</Button>
            </Group>
        </Box>
    );
};

export default LocalizationsSection;