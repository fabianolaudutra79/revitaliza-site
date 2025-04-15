// Integração do Redux com Firebase para o ReVitaliza Fitness
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Interface para o estado de autenticação
interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial de autenticação
const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null
};

// Slice para autenticação
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Interface para o estado de treinos
interface TrainingState {
  trainings: any[];
  scheduledTrainings: any[];
  loading: boolean;
  error: string | null;
}

// Estado inicial de treinos
const initialTrainingState: TrainingState = {
  trainings: [],
  scheduledTrainings: [],
  loading: false,
  error: null
};

// Slice para treinos
const trainingSlice = createSlice({
  name: 'training',
  initialState: initialTrainingState,
  reducers: {
    fetchTrainingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrainingsSuccess: (state, action: PayloadAction<any[]>) => {
      state.trainings = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTrainingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchScheduledTrainingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchScheduledTrainingsSuccess: (state, action: PayloadAction<any[]>) => {
      state.scheduledTrainings = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchScheduledTrainingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearTrainingError: (state) => {
      state.error = null;
    }
  }
});

// Interface para o estado de saúde
interface HealthState {
  healthRecords: any[];
  reminders: any[];
  loading: boolean;
  error: string | null;
}

// Estado inicial de saúde
const initialHealthState: HealthState = {
  healthRecords: [],
  reminders: [],
  loading: false,
  error: null
};

// Slice para saúde
const healthSlice = createSlice({
  name: 'health',
  initialState: initialHealthState,
  reducers: {
    fetchHealthRecordsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHealthRecordsSuccess: (state, action: PayloadAction<any[]>) => {
      state.healthRecords = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchHealthRecordsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRemindersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRemindersSuccess: (state, action: PayloadAction<any[]>) => {
      state.reminders = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRemindersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearHealthError: (state) => {
      state.error = null;
    }
  }
});

// Interface para o estado de suporte
interface SupportState {
  messages: any[];
  faqs: any[];
  loading: boolean;
  error: string | null;
}

// Estado inicial de suporte
const initialSupportState: SupportState = {
  messages: [],
  faqs: [],
  loading: false,
  error: null
};

// Slice para suporte
const supportSlice = createSlice({
  name: 'support',
  initialState: initialSupportState,
  reducers: {
    fetchMessagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMessagesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFaqsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFaqsSuccess: (state, action: PayloadAction<any[]>) => {
      state.faqs = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFaqsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSupportError: (state) => {
      state.error = null;
    }
  }
});

// Configuração da store Redux
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    training: trainingSlice.reducer,
    health: healthSlice.reducer,
    support: supportSlice.reducer
  }
});

// Exportar actions
export const authActions = authSlice.actions;
export const trainingActions = trainingSlice.actions;
export const healthActions = healthSlice.actions;
export const supportActions = supportSlice.actions;

// Tipos para dispatch e selector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks customizados para TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
