'use client';
import PrivacyAgreement from '@/headful/PrivacyAgreement/PrivacyAgreement';
import { useForm } from '../formProvider';

/** 마지막 상담 섹션의 신청 폼 (원본 시안의 .form 그대로) */
const Form = () => {
    const { form, note, updateForm, handleButtonClick, isSubmitting } = useForm();

    return (
        <form
            className="form"
            onSubmit={(e) => {
                e.preventDefault();
                handleButtonClick();
            }}
            noValidate
        >
            <input
                className="input"
                name="name"
                autoComplete="name"
                placeholder="이름"
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
            />
            <input
                className="input"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="전화번호"
                maxLength={13}
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
            />
            <button className="pill" type="submit" disabled={isSubmitting}>
                무료 상담 신청
            </button>
            <label className="consent">
                <input
                    type="checkbox"
                    checked={form.privacyValue}
                    onChange={(e) => updateForm('privacyValue', e.target.checked)}
                />
                <span>
                    상담을 위한 개인정보(이름, 전화번호) 수집·이용에 동의합니다
                    <span style={{ display: 'inline-block', marginLeft: 6 }}>
                        <PrivacyAgreement title="전문보기" decoration="underline" trigger={14} color="#DBE6FF" />
                    </span>
                </span>
            </label>
            <p className="form-note" aria-live="polite">
                {note}
            </p>
        </form>
    );
};
export default Form;
