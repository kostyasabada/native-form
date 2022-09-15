export const requestHoliday = (data) => {

  const ticket = {
    emailAddress: "",
    secureData: null,
    emailBody: "",
    name: "submit_support_form_piper",
    answers: {
      summary: {
        data: {
          answer: [
            ""
          ],
          label: "Summary",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 13
      },
      agent: {
        data: {
          answer: [
            ""
          ],
          label: "Agent",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 9
      },
      descriptionContent: {
        data: {
          answer: [

            (data.action === 'request_holiday__leave' &&
            `<div style='display: block;'>Start date:${data.startHolidayDay}</div><div style='display: block;'>End date:${data.endHolidayDay}</div><div style='display: block;'>Name project manager who approved: ${data.whoApproved}</div>`),

            (data.action === 'report_sick_leave' &&
            `<div style='display: block;'>First sick day: ${data.startHolidayDay}</div>`),

            (data.action === 'report_start_work' &&
            `<div style='display: block;'>Start date: ${data.startHolidayDay}</div>`),

          ].filter(Boolean),
          label: "Description Content",
          answerLabel: [

            (data.action === 'request_holiday__leave' &&
            `<div style='display: block;'>Start date:${data.startHolidayDay}</div><div style='display: block;'>End date:${data.endHolidayDay}</div><div style='display: block;'>Name project manager who approved: ${data.whoApproved}</div>`),

            (data.action === 'report_sick_leave' &&
            `<div style='display: block;'>First sick day: ${data.startHolidayDay}</div>`),

            (data.action === 'report_start_work' &&
            `<div style='display: block;'>Start date: ${data.startHolidayDay}</div>`),

          ].filter(Boolean),
          tags: ""
        },
        position: 10
      },
      freshdesk_submit_attachment: {
        data: {
          answer: [
            ""
          ],
          label: "",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 15
      },
      source: {
        data: {
          answer: [
            ""
          ],
          label: "Source",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 8
      },
      type: {
        data: {
          answer: [
            "hr"
          ],
          label: "Type",
          answerLabel: [
            "HR"
          ],
          tags: ""
        },
        position: 1
      },
      priority: {
        data: {
          answer: [
            "medium"
          ],
          label: "Priority",
          answerLabel: [
            "Medium"
          ],
          tags: ""
        },
        position: 6
      },
      contact_email: {
        data: {
          answer: [
            `${data.email}`
          ],
          label: "Contact email",
          answerLabel: [
            `${data.email}`
          ],
          tags: ""
        },
        position: 0
      },
      form_info_to_description_field: {
        data: {
          answer: [
            ""
          ],
          label: "",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 14
      },

      ...(data.action === 'request_holiday__leave') &&
      {request_holiday: {
        data: {
          answer: [
            `Start date:${data.startHolidayDay}\nEnd date:${data.endHolidayDay}\nName project manager who approved: ${data.whoApproved}`
          ],
          label: "Request Holiday / leave",
          answerLabel: [
            `Start date:${data.startHolidayDay}\nEnd date:${data.endHolidayDay}\nName project manager who approved: ${data.whoApproved}`
          ],
          tags: ""
        },
        position: 4
      }},

      ...(data.action === 'report_sick_leave') &&
      {report_sick_leave: {
        data: {
          answer: [
            `First sick day: ${data.startHolidayDay}`
          ],
          label: "Report sick leave",
          answerLabel: [
            `First sick day: ${data.startHolidayDay}`
          ],
          tags: ""
        },
        position: 4
      }},

      ...(data.action === 'report_start_work') &&
      {report_start_work: {
        data: {
          answer: [
            `Start date: ${data.startHolidayDay}`
          ],
          label: "Report return date after sick leave",
          answerLabel: [
            `Start date: ${data.startHolidayDay}`
          ],
          tags: ""
        },
        position: 4
      }},

      attachment: {
        data: {
          answer: [
            ""
          ],
          label: "Attachment",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 11
      },
      summary_page_fix: {
        data: {
          answer: [
            ""
          ],
          label: "",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 12
      },
      action: {
        data: {
          answer: [

            (data.action === 'request_holiday__leave' &&
            "request_holiday__leave"),
            (data.action === 'report_sick_leave' &&
            "report_sick_leave"),
            (data.action === 'report_start_work' &&
            "report_start_work"),

          ].filter(Boolean),
          label: "Action",
          answerLabel: [

            (data.action === 'request_holiday__leave' &&
            "Request Holiday / leave"),
            (data.action === 'report_sick_leave' &&
            "Report sick leave"),
            (data.action === 'report_start_work' &&
            "Report return date after sick leave"),

          ].filter(Boolean),
          tags: ""
        },
        position: 3
      },
      asset: {
        data: {
          answer: [
            "employee"
          ],
          label: "Asset",
          answerLabel: [
            "employee"
          ],
          tags: ""
        },
        position: 2
      },
      status: {
        data: {
          answer: [
            ""
          ],
          label: "Status",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 5
      },
      group: {
        data: {
          answer: [
            ""
          ],
          label: "Group",
          answerLabel: [
            ""
          ],
          tags: ""
        },
        position: 7
      }
    },
    packageId: "",
    files: {},
    locale: "EN",
    formVariables: {}
  };

  return ticket;
}