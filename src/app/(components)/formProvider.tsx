'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { generateToken } from '@/libs/utils/token';
import { useInquiryForm, normalizePhoneNumber, formatPhoneNumber, buildPhoneOverrides } from '@/libs/mleverageClient';

type FormState = {
    name: string;
    phone: string;
    privacyValue: boolean;
};

type FormContextType = {
    form: FormState;
    note: string;
    updateForm: (key: keyof FormState, value: string | boolean) => void;
    handleButtonClick: () => Promise<void>;
    isSubmitting: boolean;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

type FormProviderProps = {
    children: ReactNode;
    inquireLocation?: string;
    onSuccess?: () => void;
};

/** 화면에는 전화번호 한 칸만 두고, 전송할 때는 기존 방식대로 앞·중간·끝자리로 나눠서 보냄 */
const splitPhone = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 11);
    const firstLen = d.startsWith('02') ? 2 : 3;
    const first = d.slice(0, firstLen);
    const rest = d.slice(firstLen);
    const last = rest.length > 4 ? rest.slice(-4) : rest;
    const middle = rest.length > 4 ? rest.slice(0, -4) : '';
    return { first, middle, last, length: d.length };
};

export const FormProvider = ({ children, inquireLocation = '메인-하단', onSuccess }: FormProviderProps) => {
    const router = useRouter();
    const token = generateToken();
    const [privacyValue, setPrivacyValue] = useState(false);
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');

    const fields = [
        { key: 'name', label: '이름', required: true, defaultValue: '' },
        {
            key: 'firstPhone',
            label: '연락처 앞자리',
            required: true,
            normalize: (raw: string) => normalizePhoneNumber(raw),
        },
        {
            key: 'middlePhone',
            label: '연락처 중간자리',
            required: true,
            normalize: (raw: string) => normalizePhoneNumber(raw),
        },
        {
            key: 'lastPhone',
            label: '연락처 끝자리',
            required: true,
            normalize: (raw: string) => normalizePhoneNumber(raw),
        },
    ];

    const { values, isSubmitting, handleSubmit, setFieldValue } = useInquiryForm({
        inquiryType: 'MESSAGE',
        conversionPage: '메인',
        conversionPosition: inquireLocation.includes('상단') ? '상단' : '하단',
        fields,
        transformPayload: (currentValues) => {
            const overrides = buildPhoneOverrides(currentValues, formatPhoneNumber);
            return { ...overrides, inquireLocation };
        },
        onSuccess: () => {
            setFieldValue('name', '');
            setFieldValue('firstPhone', '');
            setFieldValue('middlePhone', '');
            setFieldValue('lastPhone', '');
            setPhone('');
            setPrivacyValue(false);

            if (onSuccess) {
                onSuccess();
                return;
            }
            const isProd = process.env.NEXT_PUBLIC_ENV === 'prod';
            if (isProd) router.push(`/complete?token=${token}`);
            else setNote('신청되었어요. 곧 전화드릴게요.');
        },
        onError: (error: any) => {
            setNote(
                error?.response?.data?.result?.message ??
                    '전송에 실패했어요. 잠시 후 다시 시도하거나 전화로 문의해 주세요.'
            );
        },
    });

    const form: FormState = {
        name: values.name ?? '',
        phone,
        privacyValue,
    };

    const updateForm = (key: keyof FormState, value: string | boolean) => {
        if (key === 'privacyValue') {
            setPrivacyValue(Boolean(value));
            return;
        }
        if (key === 'phone') {
            const v = String(value);
            setPhone(v);
            const { first, middle, last } = splitPhone(v);
            setFieldValue('firstPhone', first);
            setFieldValue('middlePhone', middle);
            setFieldValue('lastPhone', last);
            return;
        }
        setFieldValue(key, String(value));
    };

    const handleButtonClick = useCallback(async () => {
        if (isSubmitting) return;
        if (!form.name.trim()) {
            setNote('이름을 입력해 주세요.');
            return;
        }
        if (splitPhone(form.phone).length < 9) {
            setNote('전화번호를 다시 확인해 주세요.');
            return;
        }
        if (!form.privacyValue) {
            setNote('개인정보 수집·이용에 동의해 주세요.');
            return;
        }
        setNote('보내는 중…');
        await handleSubmit();
    }, [form, isSubmitting, handleSubmit]);

    return (
        <FormContext.Provider value={{ form, note, updateForm, handleButtonClick, isSubmitting }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error('useForm must be used within FormProvider');
    return ctx;
};
