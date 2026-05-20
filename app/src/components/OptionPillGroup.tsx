import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '@/src/theme';

interface OptionPillGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

export function OptionPillGroup<T extends string>({
  label,
  options,
  selectedValue,
  onSelect,
}: OptionPillGroupProps<T>) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const isSelected = option === selectedValue;

          return (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              style={[styles.pill, isSelected && styles.pillSelected]}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  label: {
    color: palette.ink,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: '#fcfaf4',
  },
  pillSelected: {
    backgroundColor: '#f4d8a2',
    borderColor: palette.amber,
  },
  pillText: {
    color: palette.copy,
    fontWeight: '700',
  },
  pillTextSelected: {
    color: '#593a05',
  },
});
