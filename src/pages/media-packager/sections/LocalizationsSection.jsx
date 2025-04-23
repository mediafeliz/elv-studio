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
    Select,
    MultiSelect,
    Textarea,
    Menu
} from "@mantine/core";
import { IconPlus, IconTrash, IconLayoutColumns, IconEye } from "@tabler/icons-react";
import { localeIsoNames } from "@/utils/media-packager/isoLocales";
import { genres } from "@/utils/media-packager/genres";

const LocalizationsSection = ({ data = [], onUpdate }) => {
    const [entries, setEntries] = useState(data || []);
    const [selected, setSelected] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState({
        default: true,
        locale: true,
        original_title: true,
        genres: true,
        summary_190: true,
        summary_400: true,
        summary_4000: true,
        copyright: true
    });

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
        const updated = entries.map((item, i) => ({ ...item, default: i === index }));
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
            updated = [...entries, ...selected.map(i => ({ ...entries[i], locale: "", default: false }))];
        } else {
            updated = [...entries, { locale: "", original_title: "", genres: [], summary_190: "", summary_400: "", summary_4000: "", copyright: "", default: false }];
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
        Object.entries(localeIsoNames).map(([code, name]) => ({ value: code, label: `${name} (${code})` }));

    const toggleColumn = (col) => {
        setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
    };

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
                        {visibleColumns.default && <Table.Th>Default</Table.Th>}
                        {visibleColumns.locale && <Table.Th>Locale</Table.Th>}
                        {visibleColumns.original_title && <Table.Th>Title</Table.Th>}
                        {visibleColumns.genres && <Table.Th>Genres</Table.Th>}
                        {visibleColumns.summary_190 && <Table.Th>Summary 190</Table.Th>}
                        {visibleColumns.summary_400 && <Table.Th>Summary 400</Table.Th>}
                        {visibleColumns.summary_4000 && <Table.Th>Summary 4000</Table.Th>}
                        {visibleColumns.copyright && <Table.Th>Copyright</Table.Th>}
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
                            {visibleColumns.default && (
                                <Table.Td>
                                    <Checkbox
                                        checked={loc.default || false}
                                        onChange={() => setDefault(index)}
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.locale && (
                                <Table.Td>
                                    <Select
                                        data={getLocaleOptions()}
                                        value={loc.locale}
                                        onChange={(val) => handleChange(index, "locale", val)}
                                        searchable
                                        placeholder="Select locale"
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.original_title && (
                                <Table.Td>
                                    <TextInput
                                        value={loc.original_title || ""}
                                        onChange={(e) => handleChange(index, "original_title", e.target.value)}
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.genres && (
                                <Table.Td>
                                    <MultiSelect
                                        data={genres}
                                        value={loc.genres || []}
                                        onChange={(val) => handleChange(index, "genres", val)}
                                        searchable
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.summary_190 && (
                                <Table.Td>
                                    <Textarea
                                        value={loc.summary_190 || ""}
                                        onChange={(e) => handleChange(index, "summary_190", e.target.value)}
                                        rows={3}
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.summary_400 && (
                                <Table.Td>
                                    <Textarea
                                        value={loc.summary_400 || ""}
                                        onChange={(e) => handleChange(index, "summary_400", e.target.value)}
                                        rows={3}
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.summary_4000 && (
                                <Table.Td>
                                    <Textarea
                                        value={loc.summary_4000 || ""}
                                        onChange={(e) => handleChange(index, "summary_4000", e.target.value)}
                                        rows={3}
                                    />
                                </Table.Td>
                            )}
                            {visibleColumns.copyright && (
                                <Table.Td>
                                    <TextInput
                                        value={loc.copyright || ""}
                                        onChange={(e) => handleChange(index, "copyright", e.target.value)}
                                    />
                                </Table.Td>
                            )}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="end" mt="md">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Button variant="light" color="gray" leftSection={<IconLayoutColumns size={16} />}>Columns</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Toggle Columns</Menu.Label>
                        {Object.keys(visibleColumns).map((col) => (
                            <Menu.Item
                                key={col}
                                onClick={() => toggleColumn(col)}
                                leftSection={<IconEye size={14} opacity={visibleColumns[col] ? 1 : 0.3} />}
                            >
                                {col.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
                <Button variant="light" color="blue" leftSection={<IconPlus size={16} />} onClick={addOrDuplicate}>Add or Duplicate</Button>
                <Button variant="light" color="red" leftSection={<IconTrash size={16} />} onClick={deleteSelected}>Delete</Button>
            </Group>
        </Box>
    );
};

export default LocalizationsSection;