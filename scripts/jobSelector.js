$(document).ready(function() {
  var jobs = {
    dev: {
      groupName: "Devs",
      options: ["Developer", "Architect developer", "Data Scientist", "Lead Data Scientist", "Tech Lead"]
    },
    ux: {
      groupName: "UX",
      options: ["UX designer", "Head of UX"]
    },
    biz: {
      groupName: "GT & Agile Coach",
      options: [
        "Business developer & Agile coach",
        "Chief Growth Officer & Agile coach"
      ]
    },
    ops: {
      groupName: "Ops",
      options: ["Operations assistant", "Operations and finance & Agile coach", "Finance and Operations"]
    },
    sales: {
      groupName: "Sales",
      options: [
        "Project Director",
        "Directeur Projet",
        "Directeur commercial",
        "Head of Sales",
        "Chief Sales Officer"
      ]
    },
    CTO: {
      groupName: "CTO",
      options: [
        "Deputy CTO",
        "Chief Technology Officer",
        "Chief Technology Officer - Cofounder"
      ]
    },
    CEO: {
      groupName: "CEO",
      options: ["CEO", "CEO - Cofounder", "Cofounder & UK CEO", "Cofounder"]
    },
    tribe: {
      groupName: "Tribe",
      options: ["Head of Kumo - Serverless Expertise by Theodo"]
    }
  };

  var jobSelector = $("#jobSelector");
  var signatureJob = $(".signatureJob");

  function initJob() {
    // add job options
    for (jobGroup in jobs) {
      let groupName = jobs[jobGroup].groupName;
      let jobOptions = jobs[jobGroup].options;
      let jobGroupOptions = `<optgroup label='${groupName}'>`;
      for (var i = 0; i < jobOptions.length; i++) {
        var job = jobOptions[i];
        jobGroupOptions += `<option value="${jobGroup}${i}">${job}</option>`;
      }
      jobGroupOptions += "</optgroup>";
      jobSelector.append(jobGroupOptions);
    }

    // get job from localStorage
    var jobGroup = "dev";
    var jobIndex = 0; // Developer
    var localStorageJob = localStorage.getItem("signatureJob");
    if (localStorageJob !== null) {
      jobGroup = localStorageJob.substr(0, localStorageJob.length - 1);
      jobIndex = localStorageJob.substr(
        localStorageJob.length - 1,
        localStorageJob.length
      );
    }

    // update selector and signature
    var option = jobSelector.find(`[value="${jobGroup}${jobIndex}"]`);

    if (option.length === 0) {
      // retro compatibility
      jobGroup = "dev";
      jobIndex = 0;
      option = jobSelector.find('[value="dev0"]');
    }

    option.attr("selected", true);
    signatureJob.each(function() {
      $(this).text(jobs[jobGroup].options[jobIndex]);
    });
  }
  initJob();

  jobSelector.change(function() {
    var jobChoice = jobSelector.find(":selected");
    signatureJob.each(function() {
      $(this).text(jobChoice.text());
    });
    localStorage.setItem("signatureJob", jobChoice.val());
  });
});
