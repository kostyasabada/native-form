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
            `<div style='display: block;'>Start date:${data.startHolidayDay}</div><div style='display: block;'>End date:${data.endHolidayDay}</div><div style='display: block;'>Name project manager who approved: ${data.whoApproved}</div>`
          ],
          label: "Description Content",
          answerLabel: [
            `<div style='display: block;'>Start date:${data.startHolidayDay}</div><div style='display: block;'>End date:${data.endHolidayDay}</div><div style='display: block;'>Name project manager who approved: ${data.whoApproved}</div>`
          ],
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
      request_holiday: {
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
      },
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
            "request_holiday__leave"
          ],
          label: "Action",
          answerLabel: [
            "Request Holiday / leave"
          ],
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