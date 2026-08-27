# Calendar

`Calendar` is a single-date calendar with controlled (`v-model`) and uncontrolled (`defaultValue`) modes.
It has no application, router, API, or event-model dependency.

```vue
<Calendar
  v-model="date"
  :min="new Date()"
  :is-date-disabled="isHoliday"
  @month-change="loadMonth"
/>
```

The component supports `min`, `max`, explicit `disabledDates`, a date predicate, localized labels,
Sunday or Monday week starts, and outside-month day visibility. Arrow keys move by day, Home/End
move within a week, Page Up/Page Down move by month, and Enter/Space use the native button action.

Range selection, events, scheduling, and multi-month display are intentionally deferred: they need
separate contracts and should compose around this date-selection primitive.
