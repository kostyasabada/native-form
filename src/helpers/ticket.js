export const requestHoliday = (data, csrfToken) => {

  const ticket = {
    questionnaireId: "ZPtqdHAy",
    locale: "EN",
    submit: true,
    csrfToken: csrfToken,
    pageId: 313625,
    emailAddress: "",
    emailBody: "",
    answers: [
      {
        id: 2,
        ctxId: "_2",
        name: "contact_email",
        label: "Contact email",
        answer: data.email,
        answerLabel: data.email,
        publicId: 313193,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 3,
        ctxId: "_3",
        name: "type",
        label: "Type",
        answer: "hr",
        answerLabel: "HR",
        publicId: 313194,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 367,
        ctxId: "_367",
        name: "asset",
        label: "Asset",
        answer: "employee",
        answerLabel: "employee",
        publicId: 313558,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 370,
        ctxId: "_370",
        name: "action",
        label: "Action",
        answer:
                  (data.action === 'request_holiday__leave') ?
                  "request_holiday__leave" :
                  (data.action === 'report_sick_leave') ?
                  "report_sick_leave" :
                  "report_start_work",
        answerLabel:
                      (data.action === 'request_holiday__leave') ?
                      "Request Holiday / leave" :
                      (data.action === 'report_sick_leave') ?
                      "Report sick leave" :
                      "Report return date after sick leave",
        publicId: 313561,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },

      (data.action === 'request_holiday__leave') &&
      {
        id: 372,
        ctxId: "_372",
        name: "request_holiday",
        label: "Request Holiday / leave",
        answer: `Start date: ${data.startHolidayDay}\nEnd date: ${data.endHolidayDay}\nName project manager who approved: ${data.whoApproved}`,
        answerLabel: `Start date: ${data.startHolidayDay}\nEnd date: ${data.endHolidayDay}\nName project manager who approved: ${data.whoApproved}`,
        publicId: 313563,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },

      (data.action === 'report_sick_leave') &&
      {
        id: 374,
        ctxId: "_374",
        name: "report_sick_leave",
        label: "Report sick leave",
        answer: `First sick day: ${data.startHolidayDay}`,
        answerLabel: `First sick day: ${data.startHolidayDay}`,
        publicId: 313565,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },

      (data.action === 'report_start_work') &&
      {
        id: 376,
        ctxId: "_376",
        name: "report_start_work",
        label: "Report return date after sick leave",
        answer: `Start date: ${data.startHolidayDay}`,
        answerLabel: `Start date: ${data.startHolidayDay}`,
        publicId: 313567,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },

      {
        id: 422,
        ctxId: "_422",
        name: "status",
        label: "Status",
        answer: "",
        answerLabel: "",
        publicId: 313613,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 423,
        ctxId: "_423",
        name: "priority",
        label: "Priority",
        answer: "low",
        answerLabel: "Low",
        publicId: 313614,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 428,
        ctxId: "_428",
        name: "group",
        label: "Group",
        answer: "",
        answerLabel: "",
        publicId: 313619,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 429,
        ctxId: "_429",
        name: "source",
        label: "Source",
        answer: "",
        answerLabel: "",
        publicId: 313620,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 430,
        ctxId: "_430",
        name: "agent",
        label: "Agent",
        answer: "",
        answerLabel: "",
        publicId: 313621,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 431,
        ctxId: "_431",
        name: "descriptionContent",
        label: "Description Content",
        answer:
              (data.action === 'request_holiday__leave') ?
             `<div style='display: block;'>Start date:${data.startHolidayDay}</div><div style='display: block;'>End date:${data.endHolidayDay}</div><div style='display: block;'>Name project manager who approved: ${data.whoApproved}</div>` :
             (data.action === 'report_sick_leave') ?
             `<div style='display: block;'>First sick day: ${data.startHolidayDay}</div>` :
             `<div style='display: block;'>Start date: ${data.startHolidayDay}</div>`,
        answerLabel:
                    (data.action === 'request_holiday__leave') ?
                    `<div style='display: block;'>Start date:${data.startHolidayDay}</div><div style='display: block;'>End date:${data.endHolidayDay}</div><div style='display: block;'>Name project manager who approved: ${data.whoApproved}</div>` :
                    (data.action === 'report_sick_leave') ?
                    `<div style='display: block;'>First sick day: ${data.startHolidayDay}</div>` :
                    `<div style='display: block;'>Start date: ${data.startHolidayDay}</div>`,
        publicId: 313622,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 432,
        ctxId: "_432",
        name: "attachment",
        label: "Attachment",
        answer: [
          " "
        ],
        answerLabel: [
          " "
        ],
        publicId: 313623,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 433,
        ctxId: "_433",
        name: "summary_page_fix",
        label: null,
        answer: "",
        answerLabel: "",
        publicId: 313624,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 435,
        ctxId: "_435",
        name: "summary",
        label: "Summary",
        answer: "",
        answerLabel: "",
        publicId: 313626,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 437,
        ctxId: "_437",
        name: "form_info_to_description_field",
        label: null,
        answer: "",
        answerLabel: "",
        publicId: 313628,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      },
      {
        id: 438,
        ctxId: "_438",
        name: "freshdesk_submit_attachment",
        label: null,
        answer: "",
        answerLabel: "",
        publicId: 313629,
        tags: "",
        fileSize: 0,
        fileType: "",
        iter: 0
      }
    ].filter(Boolean),
    formVariables: {},
    files: null,
    signature: null,
    secureData: null,
    containerId: "container"
  }

  return ticket;
}