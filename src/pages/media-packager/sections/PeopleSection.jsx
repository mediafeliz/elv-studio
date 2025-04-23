// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
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
    Text,
    Stack,
    Badge,
    ActionIcon
} from "@mantine/core";
import { IconPlus, IconTrash, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { jobTypes } from "@/utils/media-packager/types";
import { localeIsoNames } from "@/utils/media-packager/isoLocales";

const PeopleSection = ({ data = [], onUpdate }) => {
    const [entries, setEntries] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedLocs, setSelectedLocs] = useState({});
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        const initialized = data.map((item, index) => ({
            ...item,
            order: item.order ?? index + 1,
            localizations: item.localizations || []
        }));
        setEntries(initialized);
    }, [data]);

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

    const toggleLocSelection = (personIndex, locIndex) => {
        const key = `${personIndex}-${locIndex}`;
        setSelectedLocs((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleAllLocs = (personIndex) => {
        const updated = { ...selectedLocs };
        const allSelected = entries[personIndex].localizations.every((_, i) => selectedLocs[`${personIndex}-${i}`]);
        entries[personIndex].localizations.forEach((_, i) => {
            updated[`${personIndex}-${i}`] = !allSelected;
        });
        setSelectedLocs(updated);
    };

    const toggleExpanded = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleChange = (index, field, value) => {
        const updated = [...entries];
        updated[index][field] = value;
        setEntries(updated);
        onUpdate(updated);
    };

    const handleLocalizationChange = (personIndex, locIndex, field, value) => {
        const updated = [...entries];
        updated[personIndex].localizations[locIndex][field] = value;
        setEntries(updated);
        onUpdate(updated);
    };

    const addEntry = () => {
        const newEntry = {
            order: entries.length + 1,
            job: "",
            character: "",
            localizations: []
        };
        const updated = [...entries, newEntry];
        setEntries(updated);
        onUpdate(updated);
    };

    const deleteSelected = () => {
        const updated = entries.filter((_, i) => !selected.includes(i));
        setEntries(updated);
        setSelected([]);
        onUpdate(updated);
    };

    const addLocalization = (index) => {
        const updated = [...entries];
        updated[index].localizations.push({ display_name: "", locale: "" });
        setEntries(updated);
        onUpdate(updated);
    };

    const deleteSelectedLocalizations = (personIndex) => {
        const updated = [...entries];
        updated[personIndex].localizations = updated[personIndex].localizations.filter((_, i) => !selectedLocs[`${personIndex}-${i}`]);
        setEntries(updated);
        onUpdate(updated);
        const newSelectedLocs = { ...selectedLocs };
        Object.keys(newSelectedLocs).forEach((key) => {
            if (key.startsWith(`${personIndex}-`)) delete newSelectedLocs[key];
        });
        setSelectedLocs(newSelectedLocs);
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
                                checked={selected.length === entries.length}
                                indeterminate={selected.length > 0 && selected.length < entries.length}
                                onChange={toggleAll}
                            />
                        </Table.Th>
                        <Table.Th style={{ width: 80 }}>Order</Table.Th>
                        <Table.Th>Job</Table.Th>
                        <Table.Th>Character</Table.Th>
                        <Table.Th style={{ width: 200 }}>Display Name</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {entries.map((person, index) => (
                        <React.Fragment key={index}>
                            <Table.Tr>
                                <Table.Td>
                                    <Checkbox
                                        checked={selected.includes(index)}
                                        onChange={() => toggleSelection(index)}
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <TextInput
                                        type="number"
                                        value={person.order}
                                        onChange={(e) => handleChange(index, "order", parseInt(e.target.value))}
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <Select
                                        data={jobTypes}
                                        value={person.job}
                                        onChange={(val) => handleChange(index, "job", val)}
                                        searchable
                                        placeholder="Select job"
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <TextInput
                                        value={person.character || ""}
                                        onChange={(e) => handleChange(index, "character", e.target.value)}
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <Stack gap="xs">
                                        {person.localizations.length > 0 ? (
                                            person.localizations.map((loc, locIndex) => (
                                                <Group key={locIndex} gap="xs">
                                                    <Text size="sm">{loc.display_name}</Text>
                                                    {loc.locale && (
                                                        <Badge size="xs" variant="light" style={{ textTransform: "none" }}>
                                                            {loc.locale}
                                                        </Badge>
                                                    )}
                                                </Group>
                                            ))
                                        ) : (
                                            <Text size="sm" c="gray">
                                                No display names
                                            </Text>
                                        )}
                                    </Stack>
                                    <br></br>
                                    {person.localizations.length > 0 && (
                                        <ActionIcon variant="light" size="sm" onClick={() => toggleExpanded(index)}>
                                            {expanded[index] ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                                        </ActionIcon>
                                    )}
                                </Table.Td>
                            </Table.Tr>

                            {expanded[index] && (
                                <>
                                    <Table.Tr>
                                        <Table.Td></Table.Td>
                                        <Table.Th>
                                            <Checkbox
                                                checked={person.localizations.every((_, i) => selectedLocs[`${index}-${i}`])}
                                                indeterminate={person.localizations.some((_, i) => selectedLocs[`${index}-${i}`]) && !person.localizations.every((_, i) => selectedLocs[`${index}-${i}`])}
                                                onChange={() => toggleAllLocs(index)}
                                            />
                                        </Table.Th>
                                        <Table.Th colSpan={2}>Display Name</Table.Th>
                                        <Table.Th colSpan={2}>Locale</Table.Th>
                                    </Table.Tr>

                                    {person.localizations.map((loc, locIndex) => (
                                        <Table.Tr key={`${index}-loc-${locIndex}`}>
                                            <Table.Td></Table.Td>
                                            <Table.Td>
                                                <Checkbox
                                                    checked={!!selectedLocs[`${index}-${locIndex}`]}
                                                    onChange={() => toggleLocSelection(index, locIndex)}
                                                />
                                            </Table.Td>
                                            <Table.Td colSpan={2}>
                                                <TextInput
                                                    value={loc.display_name}
                                                    placeholder="Display Name"
                                                    onChange={(e) => handleLocalizationChange(index, locIndex, "display_name", e.target.value)}
                                                />
                                            </Table.Td>
                                            <Table.Td colSpan={2}>
                                                <Select
                                                    data={Object.entries(localeIsoNames).map(([code, name]) => ({ value: code, label: `${name} (${code})` }))}
                                                    value={loc.locale}
                                                    onChange={(val) => handleLocalizationChange(index, locIndex, "locale", val)}
                                                    searchable
                                                    placeholder="Select locale"
                                                />
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}

                                    <Table.Tr>
                                        <Table.Td colSpan={6}>
                                            <Group justify="space-between" align="center" py={4}>
                                                <Group>
                                                    <Button variant="light" size="xs" onClick={() => addLocalization(index)}>
                                                        + Add Display Name
                                                    </Button>
                                                    <Button variant="light" color="red" size="xs" onClick={() => deleteSelectedLocalizations(index)}>
                                                        Delete Selected
                                                    </Button>
                                                </Group>
                                                <Divider my="sm" w="100%" />
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="end" mt="md">
                <Button variant="light" color="blue" leftSection={<IconPlus size={16} />} onClick={addEntry}>Add</Button>
                <Button variant="light" color="red" leftSection={<IconTrash size={16} />} onClick={deleteSelected}>Delete</Button>
            </Group>
        </Box>
    );
};

export default PeopleSection;