// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
    Box,
    Table,
    Title,
    Button,
    Group,
    Divider,
    Checkbox
} from "@mantine/core";
import { IconPlus, IconTrash, IconDeviceFloppy, IconEdit } from "@tabler/icons-react";

const PeopleSection = ({ data = [] }) => {
    const [selected, setSelected] = useState([]);

    const toggleSelection = (index) => {
        setSelected((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleAll = () => {
        setSelected((prev) =>
            prev.length === data.length ? [] : data.map((_, i) => i)
        );
    };

    return (
        <Box my="xl">
            <Title order={4} mb="xs" c="blue.7">
                People
            </Title>
            <Divider my="sm" />

            <Table withTableBorder withColumnBorders striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Checkbox
                                checked={selected.length === data.length}
                                indeterminate={selected.length > 0 && selected.length < data.length}
                                onChange={toggleAll}
                            />
                        </Table.Th>
                        <Table.Th>Order</Table.Th>
                        <Table.Th>Job</Table.Th>
                        <Table.Th>Character</Table.Th>
                        <Table.Th>Display Names</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Checkbox
                                    checked={selected.includes(index)}
                                    onChange={() => toggleSelection(index)}
                                />
                            </Table.Td>
                            <Table.Td>{row.order}</Table.Td>
                            <Table.Td>{row.job}</Table.Td>
                            <Table.Td>{row.character}</Table.Td>
                            <Table.Td>{row.display_names}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="end" mt="md">
                <Button variant="light" color="gray" leftSection={<IconEdit size={16} />}>Edit Display Names</Button>
                <Button variant="light" color="blue" leftSection={<IconPlus size={16} />}>Add</Button>
                <Button variant="light" color="red" leftSection={<IconTrash size={16} />}>Delete</Button>
                <Button variant="filled" color="blue" leftSection={<IconDeviceFloppy size={16} />}>Save</Button>
            </Group>
        </Box>
    );
};

export default PeopleSection;