import { FC, ReactNode } from 'react';
import {
  SimpleGrid,
  useRadioGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { RadioCard } from '@/components/RadioCard';
import { useController, Control, FieldValues } from 'react-hook-form';

export const RadioGroup: FC<{
  control: any;
  label: Function;
  name: string;
  options: Array<{}>;
  isRequired?: boolean;
  columns: Array<number> | number;
  spacing: Array<number> | number;
  style: Object;
}> = ({
  label,
  name,
  control,
  options,
  isRequired,
  columns,
  spacing,
  style,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  });

  const group = getRootProps();

  const renderOptions = () => {
    return options.map((option: any, idx) => {
      const radio = getRadioProps({ value: option.value });
      return (
        <RadioCard key={idx} style={style} {...radio}>
          {option.content}
        </RadioCard>
      );
    });
  };

  return (
    <>
      <FormControl isInvalid={!!errors[name]} isRequired={isRequired}>
        <FormLabel
          htmlFor={name}
          color='black'
          fontFamily='DM mono'
          fontSize='24px'
          mb='40px'
          lineHeight='120%'
        >
          {label()}
        </FormLabel>
        <SimpleGrid columns={columns} spacing={spacing} {...group}>
          {renderOptions()}
        </SimpleGrid>
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};
