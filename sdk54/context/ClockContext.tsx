import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Alarm = {
  id: string;
  time: string; // e.g. "07:00 AM"
  isEnabled: boolean;
};

type ClockContextType = {
  alarms: Alarm[];
  addAlarm: (time: string) => void;
  toggleAlarm: (id: string) => void;
  removeAlarm: (id: string) => void;
  updateAlarmTime: (id: string, newTime: string) => void;
  clearAllAlarms: () => void;
};

const ClockContext = createContext<ClockContextType | undefined>(undefined);
const STORAGE_KEY = "@alarms_data";

export const ClockProvider = ({ children }: { children: ReactNode }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  // 🧠 Load alarms from storage when app starts
  useEffect(() => {
    const loadAlarms = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setAlarms(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Error loading alarms:", e);
      }
    };
    loadAlarms();
  }, []);

  // 💾 Save alarms to storage every time they change
  useEffect(() => {
    const saveAlarms = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
      } catch (e) {
        console.error("Error saving alarms:", e);
      }
    };
    saveAlarms();
  }, [alarms]);

  const addAlarm = (time: string) => {
    const newAlarm: Alarm = {
      id: Date.now().toString(),
      time,
      isEnabled: true,
    };
    setAlarms((prev) => [...prev, newAlarm]);
  };

  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
      )
    );
  };

  const removeAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  const updateAlarmTime = (id: string, newTime: string) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, time: newTime } : alarm
      )
    );
  };

  const clearAllAlarms = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setAlarms([]);
    } catch (e) {
      console.error("Error clearing alarms:", e);
    }
  };

  return (
    <ClockContext.Provider
      value={{
        alarms,
        addAlarm,
        toggleAlarm,
        removeAlarm,
        updateAlarmTime,
        clearAllAlarms,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};

export const useClock = () => {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
};
