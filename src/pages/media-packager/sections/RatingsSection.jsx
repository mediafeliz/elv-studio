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
  MultiSelect,
  TextInput
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { filmRatings } from "@/utils/media-packager/territoryRatings";

const RatingsSection = ({ data = [], onUpdate }) => {
  const [entries, setEntries] = useState(data);
  const [selected, setSelected] = useState([]);
  const [newEntry, setNewEntry] = useState({ country: "", rating: "", reason: [], system: "" });

  const getCountryOptions = () => {
    const used = new Set(entries.map(e => e.country));
    return Object.entries(filmRatings)
      .filter(([code]) => !used.has(code))
      .map(([code, { name }]) => ({ value: code, label: `${name} (${code})` }));
  };

  const getRatingOptions = (country) => filmRatings[country]?.ratings || [];
  const getReasonOptions = (country) => filmRatings[country]?.reasons || [];
  const isReasonRequired = (country) => filmRatings[country]?.reasons_required;
  const getSystem = (country) => filmRatings[country]?.system || "";
  const getCountryLabel = (code) => filmRatings[code]?.name ? `${filmRatings[code].name} (${code})` : code;

  const handleChange = (field, value) => {
    const updated = { ...newEntry, [field]: value };
    if (field === "country") {
      updated.rating = "";
      updated.reason = [];
      updated.system = getSystem(value);
    }
    setNewEntry(updated);
  };

  const handleLiveEdit = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
    onUpdate(updated);
  };

  const addEntry = () => {
    if (!newEntry.country || !newEntry.rating || (isReasonRequired(newEntry.country) && newEntry.reason.length === 0)) {
      alert("Please fill in all required fields.");
      return;
    }
    const updated = [...entries, newEntry];
    setEntries(updated);
    setNewEntry({ country: null, rating: null, reason: [], system: "" });
    onUpdate(updated);
  };

  const deleteSelected = () => {
    const updated = entries.filter((_, i) => !selected.includes(i));
    setEntries(updated);
    setSelected([]);
    onUpdate(updated);
  };

  const toggleSelection = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Box my="xl">
      <Title order={4} mb="xs" c="blue.7">
        Ratings
      </Title>
      <Divider my="sm" />

      <Table withTableBorder withColumnBorders striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th style={{ width: "160px" }}>Country</Table.Th>
            <Table.Th style={{ width: "160px" }}>Rating</Table.Th>
            <Table.Th>Reason</Table.Th>
            <Table.Th>System</Table.Th>
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
              <Table.Td>{getCountryLabel(row.country)}</Table.Td>
              <Table.Td>
                <Select
                  data={getRatingOptions(row.country)}
                  value={row.rating}
                  onChange={(val) => handleLiveEdit(index, "rating", val)}
                  searchable
                  disabled={!row.country}
                />
              </Table.Td>
              <Table.Td>
                <MultiSelect
                  data={getReasonOptions(row.country)}
                  value={row.reason || []}
                  onChange={(val) => handleLiveEdit(index, "reason", val)}
                  searchable
                  disabled={!row.country || !isReasonRequired(row.country)}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  value={row.system}
                  disabled
                  readOnly
                />
              </Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr>
            <Table.Td></Table.Td>
            <Table.Td>
              <Select
                data={getCountryOptions()}
                value={newEntry.country}
                onChange={(val) => handleChange("country", val)}
                searchable
                placeholder="Select country"
              />
            </Table.Td>
            <Table.Td>
              <Select
                data={getRatingOptions(newEntry.country)}
                value={newEntry.rating}
                onChange={(val) => handleChange("rating", val)}
                placeholder="Rating"
                searchable
                disabled={!newEntry.country}
              />
            </Table.Td>
            <Table.Td>
              <MultiSelect
                data={getReasonOptions(newEntry.country)}
                value={newEntry.reason}
                onChange={(val) => handleChange("reason", val)}
                placeholder="Select reasons"
                searchable
                disabled={!newEntry.country || !isReasonRequired(newEntry.country)}
              />
            </Table.Td>
            <Table.Td>
              <TextInput disabled value={getSystem(newEntry.country)} readOnly />
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

export default RatingsSection;