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
    Select,
    TextInput
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { filmRatings } from "@/utils/media-packager/territoryRatings";
import { releaseTypes } from "@/utils/media-packager/types";

const ReleaseDatesSection = ({ data = [], onUpdate }) => {
    const [selected, setSelected] = useState([]);
    const [entries, setEntries] = useState(data);
    const [newEntry, setNewEntry] = useState({ country: "", type: "", date: "" });

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

    const addEntry = () => {
        if (!newEntry.country || !newEntry.type) {
            alert("Please fill all fields before adding a new row.");
            return;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(newEntry.date)) {
            alert("Invalid date format. Please use YYYY-MM-DD.");
            return;
        }
        const updated = [...entries, newEntry];
        setEntries(updated);
        onUpdate(updated);
        setNewEntry({ country: null, type: null, date: "" });
    };

    const deleteSelected = () => {
        const updated = entries.filter((_, i) => !selected.includes(i));
        setEntries(updated);
        setSelected([]);
        onUpdate(updated);
    };

    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">
                Release Dates
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
                        <Table.Th>Country</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Date</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {entries.map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Checkbox
                                    checked={selected.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </Table.Td>
                            <Table.Td>{row.country}</Table.Td>
                            <Table.Td>{row.type}</Table.Td>
                            <Table.Td>{row.date}</Table.Td>
                        </Table.Tr>
                    ))}
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td>
                            <Select
                                data={Object.keys(filmRatings)}
                                value={newEntry.country}
                                onChange={(val) => setNewEntry({ ...newEntry, country: val })}
                                placeholder="Select country"
                                searchable
                                clearable
                            />
                        </Table.Td>
                        <Table.Td>
                            <Select
                                data={releaseTypes}
                                value={newEntry.type}
                                onChange={(val) => setNewEntry({ ...newEntry, type: val })}
                                placeholder="Select type"
                                searchable
                                clearable
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                placeholder="YYYY-MM-DD"
                                value={newEntry.date}
                                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <Group justify="end" mt="md">
                <Button variant="light" color="red" leftSection={<IconTrash size={16} />} onClick={deleteSelected}>Delete</Button>
                <Button variant="light" color="blue" leftSection={<IconPlus size={16} />} onClick={addEntry}>Add</Button>
            </Group>
        </Box>
    );
};

export default ReleaseDatesSection;