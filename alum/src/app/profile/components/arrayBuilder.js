export default function arrayBuilder(type) {
  const array = [
    type == "occupation"
      ? ["Company", "Position", "Duration", "Description"]
      : type == "education"
      ? ["Institute", "Course", "Duration", "Description"]
      : type == "projects"
      ? ["Title", "Associated with", "Duration", "Description"]
      : type == "honors"
      ? ["Title", "Associated with", "Date", "Description"]
      : ["Title", "Subtitle", "Duration", "Description"],
  ];
  return array[0];
}
