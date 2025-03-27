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
    Checkbox
} from "@mantine/core";
import { IconPlus, IconDeviceFloppy } from "@tabler/icons-react";

const PackageFilesSection = ({ data, onUpdate }) => {
    const [entries, setEntries] = useState(data || []);
    const [newEntry, setNewEntry] = useState({
        file_type: "",
        file_name: "",
        is_dubbed: "",
        locale: "",
        track_of: "",
        burned_sub: "",
        audio: "",
        resolution: ""
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
            file_name: "",
            is_dubbed: "",
            locale: "",
            track_of: "",
            burned_sub: "",
            audio: "",
            resolution: ""
        });
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
                        <Table.Th>File Type</Table.Th>
                        <Table.Th>File Name</Table.Th>
                        <Table.Th>Dubbed</Table.Th>
                        <Table.Th>Locale</Table.Th>
                        <Table.Th>Track Of</Table.Th>
                        <Table.Th>Burned Sub</Table.Th>
                        <Table.Th>Audio</Table.Th>
                        <Table.Th>Resolution</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {entries.map((item, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Checkbox
                                    checked={selected.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </Table.Td>
                            <Table.Td>{item.file_type}</Table.Td>
                            <Table.Td>{item.file_name}</Table.Td>
                            <Table.Td>{item.is_dubbed}</Table.Td>
                            <Table.Td>{item.locale}</Table.Td>
                            <Table.Td>{item.track_of}</Table.Td>
                            <Table.Td>{item.burned_sub}</Table.Td>
                            <Table.Td>{item.audio}</Table.Td>
                            <Table.Td>{item.resolution}</Table.Td>
                        </Table.Tr>
                    ))}
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.file_type}
                                onChange={(e) => setNewEntry({ ...newEntry, file_type: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.file_name}
                                onChange={(e) => setNewEntry({ ...newEntry, file_name: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.is_dubbed}
                                onChange={(e) => setNewEntry({ ...newEntry, is_dubbed: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.locale}
                                onChange={(e) => setNewEntry({ ...newEntry, locale: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.track_of}
                                onChange={(e) => setNewEntry({ ...newEntry, track_of: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.burned_sub}
                                onChange={(e) => setNewEntry({ ...newEntry, burned_sub: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.audio}
                                onChange={(e) => setNewEntry({ ...newEntry, audio: e.target.value })}
                            />
                        </Table.Td>
                        <Table.Td>
                            <TextInput
                                value={newEntry.resolution}
                                onChange={(e) => setNewEntry({ ...newEntry, resolution: e.target.value })}
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <Group mt="sm" justify="flex-end">
                <Button variant="default" onClick={addNewEntry} leftSection={<IconPlus size={16} />}>Add Row</Button>
                <Button variant="filled" color="blue" leftSection={<IconDeviceFloppy size={16} />}>Save</Button>
            </Group>
        </Box>
    );
};

export default PackageFilesSection;