"use client";

import { useState } from "react";
import type { BetakSharePageContent, Feature } from "@/lib/api/types";
import { newId } from "@/lib/admin/utils";
import { putApi } from "@/lib/admin/api-client";
import {
  Field,
  LocalizedField,
  PageHeader,
  SaveButton,
  SelectField,
} from "./FormControls";

const iconOptions = [
  { value: "shield", label: "Shield" },
  { value: "building", label: "Building" },
  { value: "chart", label: "Chart" },
  { value: "people", label: "People" },
];

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1a2440]/40 p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#c8a85a]">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function BetakSharePageEditor({
  initialData,
}: {
  initialData: BetakSharePageContent;
}) {
  const [data, setData] = useState(initialData);

  async function save() {
    await putApi("/api/betakSharePage", data);
  }

  function updateAdvantage(index: number, next: Feature) {
    setData((current) => ({
      ...current,
      advantages: current.advantages.map((item, i) =>
        i === index ? next : item,
      ),
    }));
  }

  function updateStep(
    index: number,
    field: "title" | "description",
    value: Feature["title"],
  ) {
    setData((current) => ({
      ...current,
      steps: current.steps.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateFaq(
    index: number,
    field: "question" | "answer",
    value: Feature["title"],
  ) {
    setData((current) => ({
      ...current,
      faq: current.faq.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addFaq() {
    setData((current) => ({
      ...current,
      faq: [
        ...current.faq,
        {
          id: newId(),
          question: { ar: "", en: "" },
          answer: { ar: "", en: "" },
        },
      ],
    }));
  }

  function removeFaq(id: string) {
    setData((current) => ({
      ...current,
      faq: current.faq.filter((item) => item.id !== id),
    }));
  }

  return (
    <div>
      <PageHeader
        title="Betak Share Page"
        description="Hero, advantages, steps, and FAQ content for the Betak Share landing page. Investment opportunity cards are managed under Investments."
      />
      <div className="max-w-4xl space-y-6">
        <SectionBlock title="Hero">
          <LocalizedField
            label="Badge"
            value={data.hero.badge}
            onChange={(badge) =>
              setData({ ...data, hero: { ...data.hero, badge } })
            }
          />
          <LocalizedField
            label="Title"
            value={data.hero.title}
            onChange={(title) =>
              setData({ ...data, hero: { ...data.hero, title } })
            }
          />
          <LocalizedField
            label="Subtitle"
            value={data.hero.subtitle}
            onChange={(subtitle) =>
              setData({ ...data, hero: { ...data.hero, subtitle } })
            }
            multiline
          />
        </SectionBlock>

        <SectionBlock title="Feature pills">
          {data.featurePills.map((pill, index) => (
            <LocalizedField
              key={index}
              label={`Pill ${index + 1}`}
              value={pill}
              onChange={(value) => {
                const featurePills = [...data.featurePills];
                featurePills[index] = value;
                setData({ ...data, featurePills });
              }}
            />
          ))}
        </SectionBlock>

        <SectionBlock title="Section titles">
          <LocalizedField
            label="Opportunities title"
            value={data.opportunitiesTitle}
            onChange={(opportunitiesTitle) =>
              setData({ ...data, opportunitiesTitle })
            }
          />
          <LocalizedField
            label="Advantages title"
            value={data.advantagesTitle}
            onChange={(advantagesTitle) =>
              setData({ ...data, advantagesTitle })
            }
          />
          <LocalizedField
            label="Steps title"
            value={data.stepsTitle}
            onChange={(stepsTitle) => setData({ ...data, stepsTitle })}
          />
          <LocalizedField
            label="FAQ title"
            value={data.faqTitle}
            onChange={(faqTitle) => setData({ ...data, faqTitle })}
          />
        </SectionBlock>

        <SectionBlock title="Advantages">
          {data.advantages.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-lg border border-white/5 p-4"
            >
              <SelectField
                label="Icon"
                value={item.icon}
                onChange={(icon) =>
                  updateAdvantage(index, {
                    ...item,
                    icon: icon as Feature["icon"],
                  })
                }
                options={iconOptions}
              />
              <LocalizedField
                label="Title"
                value={item.title}
                onChange={(title) => updateAdvantage(index, { ...item, title })}
              />
              <LocalizedField
                label="Description"
                value={item.description}
                onChange={(description) =>
                  updateAdvantage(index, { ...item, description })
                }
                multiline
              />
            </div>
          ))}
        </SectionBlock>

        <SectionBlock title="How it works">
          {data.steps.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-lg border border-white/5 p-4"
            >
              <p className="text-xs font-semibold text-gray-400">
                Step {index + 1}
              </p>
              <LocalizedField
                label="Title"
                value={item.title}
                onChange={(title) => updateStep(index, "title", title)}
              />
              <LocalizedField
                label="Description"
                value={item.description}
                onChange={(description) =>
                  updateStep(index, "description", description)
                }
                multiline
              />
            </div>
          ))}
        </SectionBlock>

        <SectionBlock title="FAQ">
          {data.faq.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-lg border border-white/5 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-400">
                  Question {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeFaq(item.id)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
              <LocalizedField
                label="Question"
                value={item.question}
                onChange={(question) => updateFaq(index, "question", question)}
              />
              <LocalizedField
                label="Answer"
                value={item.answer}
                onChange={(answer) => updateFaq(index, "answer", answer)}
                multiline
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="rounded-lg bg-[#233a72] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2f4d8f]"
          >
            Add FAQ
          </button>
        </SectionBlock>

        <SaveButton onSave={save} />
      </div>
    </div>
  );
}
