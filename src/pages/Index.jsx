import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (inputValue.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: inputValue, isComplete: false }]);
    setInputValue('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      <IconButton
        icon={<FaPlus />}
        ml={2}
        colorScheme="blue"
        onClick={addTask}
        aria-label="Add task"
      />
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon
              as={task.isComplete ? FaCheckCircle : FaRegCircle}
              color={task.isComplete ? 'green.500' : 'gray.500'}
              onClick={() => toggleTaskCompletion(task.id)}
              cursor="pointer"
            />
            <Box flex="1" as="span" textDecoration={task.isComplete ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              ml={2}
              colorScheme="red"
              onClick={() => removeTask(task.id)}
              aria-label="Remove task"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;